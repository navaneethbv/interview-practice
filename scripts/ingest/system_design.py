#!/usr/bin/env python3
"""Imports the system design books into content/system-design/<book>/.

Each book becomes index.json (parts, chapters and their one-line leads) plus one Markdown
file per chapter. Diagrams are rendered from their region of the PDF page and saved as WebP
under public/course-assets/system-design/<book>/, so vector drawings survive as well as images.

Requires pdfplumber (MIT; pulls in pypdfium2 and Pillow):
    python3 -m pip install pdfplumber

Usage:
    python3 scripts/ingest/system_design.py grokking "<Grokking-the-system-design-interview...pdf>"
    python3 scripts/ingest/system_design.py advanced "<Grokking the Advanced System Design Interview.pdf>"
    python3 scripts/ingest/system_design.py notes "<Grokking the System Design Interview.md>"

Re-running a book replaces its folder; other books are untouched.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content" / "system-design"
ASSET_DIR = ROOT / "public" / "course-assets" / "system-design"
ASSET_URL = "/course-assets/system-design"

BOOKS = {
    "grokking": {
        "title": "Grokking the System Design Interview",
        "short": "System Design Interview",
        "description": "The classic course: a step-by-step interview framework, 16 worked designs from TinyURL to Ticketmaster, and the building blocks every design uses.",
    },
    "advanced": {
        "title": "Grokking the Advanced System Design Interview",
        "short": "Advanced System Design",
        "description": "How real distributed systems work: Dynamo, Cassandra, Kafka, Chubby, GFS, HDFS and BigTable, followed by 20 reusable system design patterns.",
    },
    "notes": {
        "title": "System Design Interview Notes",
        "short": "Condensed Notes",
        "description": "Junfan Zhu's condensed review notes of the classic course, for a fast refresher before an interview.",
    },
}


# --------------------------------------------------------------------------- text helpers

def load_words() -> set[str]:
    try:
        return {w.strip().lower() for w in Path("/usr/share/dict/words").read_text().splitlines()}
    except OSError:
        return set()


WORDS = load_words()
if not WORDS:
    print("warning: /usr/share/dict/words is missing; ligatures and hyphenation will not be repaired", file=sys.stderr)
LIGATURES = ("fi", "fl", "ff", "ffi", "ffl")


def is_word(word: str, compound: bool = False) -> bool:
    w = word.lower()
    if w in WORDS:
        return True
    for suffix in ("s", "es", "ed", "d", "ing", "ly", "er", "ers", "ment", "ments"):
        if w.endswith(suffix) and w[: -len(suffix)] in WORDS:
            return True
    # Compounds such as "workflow" are missing from the system word list.
    return compound and any(is_word(w[:i]) and is_word(w[i:]) for i in range(3, len(w) - 2))


def fix_ligatures(text: str) -> str:
    """The advanced PDF's heading font maps fi/fl ligatures to NUL; pick the spelling that forms a word."""
    if "\x00" not in text:
        return text

    def repl(m: re.Match[str]) -> str:
        word = m.group(0)
        for compound in (False, True):
            for lig in LIGATURES:
                candidate = word.replace("\x00", lig)
                if is_word(re.sub(r"[^A-Za-z]", "", candidate), compound):
                    return candidate
        return word.replace("\x00", "fi")

    return re.sub(r"[A-Za-z\x00]+", repl, text)


def slugify(text: str) -> str:
    text = text.lower().replace("’", "").replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")[:80]


MD_SPECIAL = re.compile(r"([\\`*_\[\]<>~|])")


def md_escape(text: str) -> str:
    return MD_SPECIAL.sub(r"\\\1", text.replace("&", "&amp;"))


def escape_block_start(md: str) -> str:
    """Stop a paragraph that happens to start like Markdown syntax from turning into it."""
    if re.match(r"^(#{1,6}\s|[-+]\s|>|\d+[.)]\s|={3,}|-{3,})", md):
        return "\\" + md
    return md


PAREN_URL = re.compile(r"\s*\(\s*(?:https?://|www\.)[^)]*\)")
BARE_URL = re.compile(r"^(?:https?://|www\.)\S+$")
URL_RE = re.compile(r"(?:https?://|www\.)[^\s,;)“”\"']*[^\s,;.)“”\"']")
URL_SPLIT = re.compile(f"({URL_RE.pattern})")


# --------------------------------------------------------------------------- model

@dataclass
class Span:
    text: str
    style: str = ""  # combination of "b", "i", "c" (code)


@dataclass
class Line:
    page: int
    x0: float
    x1: float
    top: float
    bottom: float
    font: str
    size: float
    spans: list[Span]
    kind: str = "body"

    @property
    def text(self) -> str:
        return "".join(s.text for s in self.spans)


@dataclass
class Figure:
    page: int
    top: float
    bottom: float
    image: object  # PIL.Image, written out once the chapter is assembled
    width: int
    height: int
    src: str = ""


@dataclass
class Table:
    page: int
    top: float
    bottom: float
    rows: list[list[str]]
    header: bool


@dataclass
class Block:
    kind: str  # h2 h3 h4 p li ol note code formula link table fig raw
    spans: list[Span] = field(default_factory=list)
    text: str = ""
    depth: int = 0
    number: int = 0
    rows: list[list[str]] = field(default_factory=list)
    header: bool = False
    fig: Figure | None = None
    caption: str = ""


@dataclass
class Chapter:
    title: str
    part: str
    blocks: list[Block] = field(default_factory=list)
    lead: list[str] = field(default_factory=list)


def font_style(fontname: str) -> str:
    style = ""
    if re.search(r"Bold|Semibold|SemiBold|Black|Heavy", fontname):
        style += "b"
    if re.search(r"Italic|Oblique|KaTeX_Math", fontname):
        style += "i"
    # The advanced PDF embeds its code font as an anonymous "font0000..." subset.
    if re.search(r"Mono|Courier|Consolas|Menlo|Code|\+font0000", fontname) and "CourierNew" not in fontname:
        style += "c"
    return style


def base_font(fontname: str) -> str:
    return fontname.split("+")[-1]


CID = re.compile(r"^\(cid:(\d+)\)$")
# The advanced summaries use a DroidSerif subset without a Unicode map; its glyph ids are ASCII - 31.
CID_EXTRA = {229: "‘", 230: "’", 232: "“", 233: "”"}


def decode_char(text: str) -> str:
    m = CID.match(text)
    if not m:
        return text
    code = int(m.group(1)) + 31
    return CID_EXTRA.get(code, chr(code) if 32 <= code < 127 else "")


def build_line(page_no: int, chars: list[dict]) -> Line | None:
    # extract_text_lines repeats a char once per character of its text, e.g. 8x for "(cid:18)".
    unique = {(c["x0"], c["top"], c["text"]): c for c in chars if c["text"] not in ("\n", "\r")}
    chars = sorted(unique.values(), key=lambda c: c["x0"])
    if not chars:
        return None
    spans: list[Span] = []
    prev = None
    weights: dict[tuple[str, float], int] = {}
    for c in chars:
        text = decode_char(c["text"]).replace("\xa0", " ").replace("\uf0b7", "•")
        style = font_style(c["fontname"])
        if prev is not None and text != " " and not spans[-1].text.endswith(" "):
            if c["x0"] - prev["x1"] > 0.18 * c["size"]:
                spans.append(Span(" ", ""))
        if spans and spans[-1].style == style:
            spans[-1].text += text
        else:
            spans.append(Span(text, style))
        if text.strip():
            key = (base_font(c["fontname"]), round(c["size"], 1))
            weights[key] = weights.get(key, 0) + 1
        prev = c
    if not weights:
        return None
    font, size = max(weights, key=weights.get)
    top = min(c["top"] for c in chars)
    bottom = max(c["bottom"] for c in chars)
    line = Line(page_no, chars[0]["x0"], chars[-1]["x1"], top, bottom, font, size, spans)
    for s in line.spans:
        s.text = fix_ligatures(s.text)
    return line


# --------------------------------------------------------------------------- page analysis

def is_white(color) -> bool:
    if color is None:
        return True
    if isinstance(color, (int, float)):
        return color >= 0.98
    values = list(color)
    if not all(isinstance(v, (int, float)) for v in values):
        return False  # a pattern or shading fill
    if len(values) == 4:  # CMYK
        return all(v <= 0.02 for v in values)
    return all(v >= 0.98 for v in values)


def visible_graphics(page) -> list[dict]:
    """Rects, curves, lines and images that draw something, minus page backgrounds and link underlines."""
    out = []
    for kind in ("rects", "curves", "lines", "images"):
        for o in getattr(page, kind):
            w, h = o["x1"] - o["x0"], o["bottom"] - o["top"]
            if kind == "images":
                if w >= 40 and h >= 10:  # code signatures are exported as 18pt-tall strips
                    out.append(o)
                continue
            if w > page.width * 0.85 and h > page.height * 0.4:
                continue  # page background
            stroked = o.get("stroke") and not is_white(o.get("stroking_color"))
            filled = o.get("fill") and not is_white(o.get("non_stroking_color"))
            if not stroked and not filled:
                continue
            if kind == "rects" and h < 2.5 and w < page.width * 0.6:
                continue  # link underline
            out.append(o)
    return out


FOOTER = 45  # page numbers live in the bottom margin


def bands(objects: list[dict], gap: float, page_height: float) -> list[list[float]]:
    """Merges the vertical extents of objects into [top, bottom, x0, x1] bands."""
    limit = page_height - FOOTER
    extents = sorted(
        ([o["top"], min(o["bottom"], limit), o["x0"], o["x1"]] for o in objects if o["top"] < limit),
        key=lambda s: s[0],
    )
    merged: list[list[float]] = []
    for s in extents:
        if merged and s[0] <= merged[-1][1] + gap:
            m = merged[-1]
            m[1] = max(m[1], s[1])
            m[2] = min(m[2], s[2])
            m[3] = max(m[3], s[3])
        else:
            merged.append(list(s))
    return merged


def inside(obj: dict, region: list[float], pad: float = 2) -> bool:
    cy = (obj["top"] + obj["bottom"]) / 2
    return region[0] - pad <= cy <= region[1] + pad


RESOLUTION = 160


def render_region(page, page_no: int, bbox: tuple[float, float, float, float]) -> Figure:
    x0, top, x1, bottom = bbox
    x0, top = max(0, x0), max(0, top)
    x1, bottom = min(page.width, x1), min(page.height, bottom)
    image = page.crop((x0, top, x1, bottom)).to_image(resolution=RESOLUTION).original.convert("RGB")
    # Displayed at CSS pixels equal to PDF points so diagrams keep their printed scale.
    return Figure(page_no, top, bottom, image, round(x1 - x0), round(bottom - top))


def stitch_figures(blocks: list) -> list:
    """Rejoins a diagram that a page break split into a slice at the bottom and one at the top."""
    from PIL import Image

    out = []
    for b in blocks:
        prev = out[-1] if out else None
        if (
            b.kind == "fig" and prev is not None and prev.kind == "fig" and not prev.caption
            and b.fig.page == prev.fig.page + 1 and b.fig.top < 120 and prev.fig.bottom > 640
        ):
            top, bottom = prev.fig.image, b.fig.image
            joined = Image.new("RGB", (max(top.width, bottom.width), top.height + bottom.height), "white")
            joined.paste(top, (0, 0))
            joined.paste(bottom, (0, top.height))
            prev.fig.image = joined
            prev.fig.width = max(prev.fig.width, b.fig.width)
            prev.fig.height += b.fig.height
            prev.caption = b.caption
            continue
        out.append(b)
    return out


def save_figure(book: str, fig: Figure):
    buf = io.BytesIO()
    fig.image.save(buf, "WEBP", quality=86, method=6)
    data = buf.getvalue()
    name = hashlib.sha1(data).hexdigest()[:16] + ".webp"
    out = ASSET_DIR / book
    out.mkdir(parents=True, exist_ok=True)
    (out / name).write_bytes(data)
    fig.src = f"{ASSET_URL}/{book}/{name}"


# --------------------------------------------------------------------------- assembly

BULLET_RE = re.compile(r"^\s*([•●▪◦○■□–]|o(?=\s))\s*")
NUMBER_RE = re.compile(r"^\s*(\d{1,2})[.)]\s+")
PARAM_RE = re.compile(r"^[a-z][a-z0-9_]* \([a-z ]+\):")  # "api_dev_key (string): ..."


def strip_prefix(spans: list[Span], count: int) -> list[Span]:
    out = []
    remaining = count
    for s in spans:
        if remaining >= len(s.text):
            remaining -= len(s.text)
            continue
        out.append(Span(s.text[remaining:], s.style))
        remaining = 0
    return out


class Assembler:
    """Turns classified lines, figures and tables into chapters of blocks."""

    def __init__(self, margin: float, page_width: float, implicit_bullets: bool = False):
        self.margin = margin
        # Some books draw bullets as shapes, so an indented line that starts a block is a list item.
        self.implicit_bullets = implicit_bullets
        self.page_width = page_width
        self.chapters: list[Chapter] = []
        self.part = ""
        self.current: Block | None = None
        self.last: Line | None = None
        self.list_x: list[float] = []

    @property
    def chapter(self) -> Chapter | None:
        return self.chapters[-1] if self.chapters else None

    def flush(self):
        if self.current and self.chapter and (self.current.spans or self.current.text):
            self.chapter.blocks.append(self.current)
        self.current = None

    def start_part(self, title: str):
        self.flush()
        self.part = title

    def start_chapter(self, title: str):
        self.flush()
        self.last = None
        self.list_x = []
        self.chapters.append(Chapter(title=title, part=self.part))

    def extend_title(self, text: str):
        if self.chapter:
            self.chapter.title = clean_title(f"{self.chapter.title} {text}")

    def add_block(self, block: Block):
        self.flush()
        if self.chapter:
            self.chapter.blocks.append(block)
        self.last = None

    def add_heading(self, line: Line, level: int):
        text = clean_title(line.text)
        if not text:
            return
        self.flush()
        prev = self.chapter.blocks[-1] if self.chapter.blocks else None
        # A heading wrapped onto a second line arrives as two heading lines.
        if prev and prev.kind == f"h{level}" and self.last is not None and self.last.kind == line.kind and line.top - self.last.bottom < line.size:
            prev.text = f"{prev.text} {text}"
        else:
            self.list_x = []
            self.chapter.blocks.append(Block(kind=f"h{level}", text=text))
        self.last = line

    def continues(self, line: Line) -> bool:
        last = self.last
        if last is None or self.current is None:
            return False
        if last.page == line.page:
            # A line that stops well short of the right margin ends its paragraph.
            short = last.x1 < self.page_width - self.margin - 150 and not last.text.rstrip().endswith("-")
            return line.top - last.bottom < 0.75 * line.size and not short
        # Across a page break: join when the sentence clearly runs on.
        tail = "".join(s.text for s in self.current.spans).rstrip()
        return bool(tail) and not re.search(r"[.:!?)”\"]$", tail)

    def append(self, line: Line, spans: list[Span]):
        block = self.current
        prev_text = "".join(s.text for s in block.spans)
        first = spans[0].text if spans else ""
        tail = re.search(r"([A-Za-z]+)-$", prev_text)
        head = re.match(r"[a-z]+", first)
        if tail and head:
            # Word-processor hyphenation: drop the hyphen only when that forms a word.
            if is_word(tail.group(1) + head.group(0)) and not is_word(head.group(0)):
                block.spans[-1].text = block.spans[-1].text[:-1]
        elif not prev_text.endswith((" ", "/")) and not first.startswith(" "):
            block.spans.append(Span(" "))
        block.spans.extend(spans)
        self.last = line

    def list_depth(self, x: float) -> int:
        while self.list_x and x < self.list_x[-1] - 4:
            self.list_x.pop()
        if not self.list_x or x > self.list_x[-1] + 4:
            self.list_x.append(x)
        return len(self.list_x) - 1

    def add_run(self, kind: str, line: Line, text: str, joiner: str, joins: bool):
        if self.current and self.current.kind == kind and joins:
            self.current.text += joiner + text
        else:
            self.flush()
            self.current = Block(kind=kind, text=text, number=int(line.x0))
        self.last = line

    def add_line(self, line: Line):
        if self.chapter is None:
            return
        kind, text = line.kind, line.text
        same_page_close = self.last is not None and self.last.page == line.page and line.top - self.last.bottom < 1.2 * line.size
        if kind in ("h2", "h3", "h4"):
            self.add_heading(line, int(kind[1]))
            return
        if kind == "lead":
            self.flush()
            self.chapter.lead.append(text.strip())
            self.last = line
            return
        if kind == "caption":
            self.flush()
            prev = self.chapter.blocks[-1] if self.chapter.blocks else None
            if prev is not None and prev.kind == "fig":
                prev.caption = f"{prev.caption} {text.strip()}".strip()
                return
            kind = line.kind = "body"
        if kind == "code":
            indent = 0
            if self.current and self.current.kind == "code":
                indent = max(0, round((line.x0 - self.current.number) / (line.size * 0.55)))
            self.add_run("code", line, " " * indent + text.rstrip(), "\n", same_page_close)
            return
        if kind == "formula":
            self.add_run("formula", line, text.strip(), "\n", same_page_close and self.last.kind == "formula")
            return
        if kind == "link":
            joins = self.current is not None and self.current.kind == "link" and not re.match(r"^(https?://|www\.)", text.strip())
            self.add_run("link", line, text.strip(), "", joins)
            return

        spans = [Span(s.text, s.style) for s in line.spans]
        marker = BULLET_RE.match(text)
        number = NUMBER_RE.match(text)
        item = None
        if PARAM_RE.match(text) and kind == "body":
            self.flush()
            self.current = Block(kind="li", spans=spans, depth=0)
            self.last = line
            return
        if marker and (marker.group(1) != "o" or line.x0 > self.margin + 10):
            item = "li"
            spans = strip_prefix(spans, marker.end())
        elif number and kind != "note":
            item = "ol"
            spans = strip_prefix(spans, number.end())

        if kind == "note":
            if self.current and self.current.kind == "note":
                self.append(line, spans)
            else:
                self.flush()
                self.current = Block(kind="note", spans=spans)
                self.last = line
            return
        if item:
            self.flush()
            depth = self.list_depth(line.x0)
            self.current = Block(kind=item, spans=spans, depth=depth, number=int(number.group(1)) if item == "ol" else 0)
            self.last = line
            return
        if self.current and self.current.kind in ("li", "ol"):
            if not "".join(s.text for s in self.current.spans).strip():
                self.current.spans = spans  # the bullet glyph sat alone on its line
                self.last = line
                return
            item_x = self.list_x[-1] if self.list_x else self.margin
            if (line.x0 > item_x - 4 or self.last.page != line.page) and self.continues(line):
                self.append(line, spans)
                return
        if self.current and self.current.kind == "p" and self.continues(line):
            self.append(line, spans)
            return
        self.flush()
        if line.x0 <= self.margin + 8:
            self.list_x = []
        elif self.implicit_bullets and line.x0 > self.margin + 20:
            self.current = Block(kind="li", spans=spans, depth=self.list_depth(line.x0))
            self.last = line
            return
        self.current = Block(kind="p", spans=spans)
        self.last = line

    def finish(self) -> list[Chapter]:
        self.flush()
        return [c for c in self.chapters if c.blocks]


# --------------------------------------------------------------------------- markdown

def spans_to_md(spans: list[Span]) -> str:
    merged: list[Span] = []
    for s in spans:
        style = s.style if s.text.strip() else ""
        if merged and (merged[-1].style == style or not s.text.strip()):
            merged[-1].text += s.text
        elif s.text:
            merged.append(Span(s.text, style))
    out = ""
    for s in merged:
        text = re.sub(r"\s+", " ", s.text)
        if not s.style:
            # Example URLs in prose read as code, not as links out of the book.
            out += "".join(f"`{part}`" if URL_RE.fullmatch(part) else md_escape(part) for part in URL_SPLIT.split(text))
            continue
        lead = text[: len(text) - len(text.lstrip())]
        trail = text[len(text.rstrip()):]
        core = text.strip()
        if "c" in s.style:
            fence = "``" if "`" in core else "`"
            body = f"{fence}{core}{fence}"
        else:
            body = md_escape(core)
            if "b" in s.style and "i" in s.style:
                body = f"***{body}***"
            elif "b" in s.style:
                body = f"**{body}**"
            elif "i" in s.style:
                body = f"*{body}*"
        out += lead + body + trail
    out = PAREN_URL.sub("", out)
    out = re.sub(r"\*\*([:.,;])\*\*", r"\1", out)  # a bolded colon after a bold term
    out = re.sub(r"(`) ([.,;:!?)])", r"\1\2", out)  # the code font's padding read as a space
    return re.sub(r" {2,}", " ", out).strip()


def plain(spans: list[Span]) -> str:
    return re.sub(r"\s+", " ", "".join(s.text for s in spans)).strip()


def chapter_markdown(ch: Chapter) -> str:
    out: list[str] = []
    prev: Block | None = None
    for b in ch.blocks:
        piece = None
        if b.kind in ("h2", "h3", "h4"):
            piece = f"{'#' * int(b.kind[1])} {md_escape(b.text)}"
        elif b.kind == "p":
            text = plain(b.spans)
            if re.match(r"^https?://", text) and len(text.split()) <= 3:
                text = text.replace(" ", "")  # a long example URL wrapped across lines
            piece = f"`{text}`" if BARE_URL.match(text) else escape_block_start(spans_to_md(b.spans))
        elif b.kind in ("li", "ol"):
            md = spans_to_md(b.spans)
            if md:
                marker = f"{b.number}." if b.kind == "ol" else "-"
                item = f"{'   ' * b.depth}{marker} {md}"
                if prev is not None and prev.kind in ("li", "ol") and out:
                    out[-1] += "\n" + item
                else:
                    out.append(item)
        elif b.kind == "note":
            md = spans_to_md(b.spans)
            piece = f"> {md}" if md else None
        elif b.kind == "code":
            piece = "```\n" + b.text.rstrip() + "\n```"
        elif b.kind == "formula":
            piece = "```text\n" + b.text + "\n```"
        elif b.kind == "link":
            url = b.text if b.text.startswith("http") else "https://" + b.text
            item = f"- <{url}>"
            if prev is not None and prev.kind == "link" and out:
                out[-1] += "\n" + item
            else:
                out.append(item)
        elif b.kind == "table":
            piece = table_html(b.rows, b.header)
        elif b.kind == "fig" and b.fig:
            f = b.fig
            alt = html_escape(b.caption or f"Diagram: {ch.title}")
            img = f'<img src="{f.src}" width="{f.width}" height="{f.height}" alt="{alt}" loading="lazy">'
            caption = f"<figcaption>{html_escape(b.caption)}</figcaption>" if b.caption else ""
            piece = f"<figure>{img}{caption}</figure>"
        if piece:
            out.append(piece)
        prev = b
    return "\n\n".join(out).strip() + "\n"


def html_escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def table_html(rows: list[list[str]], header: bool) -> str:
    """HTML rather than a GFM table, because many of these tables have no header row."""
    def row(cells: list[str], tag: str) -> str:
        return "<tr>" + "".join(f"<{tag}>{html_escape(c)}</{tag}>" for c in cells) + "</tr>"

    head = f"<thead>{row(rows[0], 'th')}</thead>" if header else ""
    body = "".join(row(r, "td") for r in (rows[1:] if header else rows))
    return f"<table>{head}<tbody>{body}</tbody></table>"


# --------------------------------------------------------------------------- PDF driver

def read_table(page, page_no: int, t) -> Table | None:
    rows = [[re.sub(r"\s+", " ", c or "").strip() for c in r] for r in t.extract()]
    rows = [r for r in rows if any(r)]
    if len(rows) < 2:
        return None
    width = max(len(r) for r in rows)
    rows = [r + [""] * (width - len(r)) for r in rows]
    # Nested cell borders produce empty and repeated columns.
    keep = [i for i in range(width) if any(r[i] for r in rows)]
    rows = [[r[i] for i in keep] for r in rows]
    if len(keep) < 2:
        return None
    first = t.rows[0].bbox
    head_chars = [c for c in page.chars if first[1] <= (c["top"] + c["bottom"]) / 2 <= first[3] and c["text"].strip()]
    header = bool(head_chars) and all("Bold" in c["fontname"] for c in head_chars)
    return Table(page_no, t.bbox[1], t.bbox[3], rows, header)


def page_lines(page, page_no: int, skip: list[list[float]]) -> list[Line]:
    def keep(obj):
        if obj.get("object_type") != "char":
            return True
        return not any(inside(obj, r, 0) and r[2] - 2 <= obj["x0"] <= r[3] + 2 for r in skip)

    lines = []
    for raw in page.filter(keep).extract_text_lines(return_chars=True, strip=False):
        line = build_line(page_no, raw["chars"])
        if line and line.text.strip():
            lines.append(line)
    return lines


def clean_title(text: str) -> str:
    text = re.sub(r"\s*#\s*$", "", text.strip())
    return re.sub(r"\s*\(\*New\*\)\s*$", "", text).strip()


def process_pdf(book: str, path: Path, cfg) -> list[Chapter]:
    import pdfplumber

    with pdfplumber.open(path) as pdf:
        asm = Assembler(cfg.margin, pdf.pages[0].width, cfg.implicit_bullets)
        for index, raw_page in enumerate(pdf.pages):
            page_no = index + 1
            if page_no < cfg.first_page:
                continue
            page = raw_page.dedupe_chars()
            items: list[tuple[float, object]] = []
            skip: list[list[float]] = []

            for t in cfg.tables(page):
                table = read_table(page, page_no, t)
                if table:
                    items.append((table.top, table))
                    skip.append([t.bbox[1], t.bbox[3], t.bbox[0], t.bbox[2]])

            for top, bottom, x0, x1 in cfg.figures(page, skip):
                pad = 6
                fig = render_region(raw_page, page_no, (x0 - pad, top - pad, x1 + pad, bottom + pad))
                items.append((top, fig))
                skip.append([top, bottom, x0, x1])

            for line in page_lines(page, page_no, skip):
                items.append((line.top, line))
            items.sort(key=lambda it: it[0])

            for _, item in items:
                if isinstance(item, Figure):
                    asm.add_block(Block(kind="fig", fig=item))
                elif isinstance(item, Table):
                    asm.add_block(Block(kind="table", rows=item.rows, header=item.header))
                else:
                    cfg.classify(item, asm)
                    if item.kind == "part":
                        asm.start_part(item.text.strip())
                    elif item.kind == "title":
                        if asm.last is not None and asm.last.kind == "title" and asm.last.page == item.page:
                            asm.extend_title(item.text)
                        else:
                            asm.start_chapter(clean_title(item.text))
                        asm.last = item
                    elif item.kind != "drop":
                        asm.add_line(item)
            raw_page.flush_cache()
    chapters = asm.finish()
    assets = ASSET_DIR / book
    if assets.exists():
        shutil.rmtree(assets)
    for ch in chapters:
        ch.blocks = stitch_figures(ch.blocks)
        for b in ch.blocks:
            if b.kind == "fig":
                save_figure(book, b.fig)
    return chapters


# --------------------------------------------------------------------------- books

class AdvancedBook:
    """Grokking the Advanced System Design Interview (a Chrome print of the course pages)."""

    first_page = 2
    margin = 58
    implicit_bullets = True
    TEXT_FONTS = ("DroidSerif", "NunitoSans", "KaTeX", "unknown")
    PART_STARTS = {
        "What Is This Course About?": "Introduction",
        "Dynamo: Introduction": "Dynamo",
        "Cassandra: Introduction": "Cassandra",
        "Messaging Systems: Introduction": "Kafka",
        "Chubby: Introduction": "Chubby",
        "Google File System: Introduction": "Google File System (GFS)",
        "Hadoop Distributed File System: Introduction": "Hadoop Distributed File System (HDFS)",
        "BigTable: Introduction": "BigTable",
        "Introduction: System Design Patterns": "System Design Patterns",
    }

    def __init__(self):
        self.in_toc = False
        self.after_nav = True

    def tables(self, page):
        return []

    def figures(self, page, skip):
        graphics = visible_graphics(page)
        # Inline code shares the diagram font; only labels away from body text belong to a diagram.
        body_rows = {round(c["top"]) for c in page.chars if base_font(c["fontname"]).startswith("DroidSerif")}
        diagram_chars = [
            c for c in page.chars
            if not base_font(c["fontname"]).startswith(self.TEXT_FONTS) and not any(abs(round(c["top"]) - r) <= 4 for r in body_rows)
        ]
        out = []
        for band in bands(graphics + diagram_chars, 14, page.height):
            top, bottom, x0, x1 = band
            if bottom - top < 30:
                continue
            chars = [c for c in page.chars if inside(c, band) and c["text"].strip()]
            text_chars = [c for c in chars if base_font(c["fontname"]).startswith(("DroidSerif", "NunitoSans"))]
            has_image = any(o.get("object_type") == "image" and inside(o, band, 4) for o in graphics)
            if not has_image and len(text_chars) > 0.5 * max(1, len(chars)):
                continue  # a boxed callout or the "We'll cover the following" panel
            out.append([top, bottom, min(x0, 50), max(x1, page.width - 50)])
        return out

    def classify(self, line: Line, asm: Assembler):
        font, size, text = line.font, line.size, line.text.strip()
        if font == "NunitoSans-Bold" and size == 11.3:
            self.after_nav = True  # the Back / Next buttons that end every lesson
            line.kind = "drop"
            return
        if font == "NunitoSans-Regular" and size == 10.5:
            line.kind = "caption" if line.x0 > self.margin + 20 and not self.after_nav else "drop"
            return
        if font == "unknown":
            line.kind = "drop"
            return
        if font == "NunitoSans-Bold" and text.startswith("We'll cover the following"):
            self.in_toc = True
            line.kind = "drop"
            return
        if self.in_toc and font == "NunitoSans-Regular" and size == 13.5:
            line.kind = "drop"
            return
        self.in_toc = False
        # Lessons open on a fresh page with the title at a fixed offset; a section that
        # merely lands at the top of a page sits higher (top ~37).
        at_title_slot = 44 <= line.top <= 56 and (asm.last is None or asm.last.page != line.page)
        starts_lesson = self.after_nav or at_title_slot or (asm.last is not None and asm.last.kind == "title")
        self.after_nav = False
        if font.startswith("NunitoSans") and 22 <= size < 23 and starts_lesson:
            title = clean_title(text)
            if title in self.PART_STARTS:
                asm.start_part(self.PART_STARTS[title])
            line.kind = "title"
        elif font.startswith("NunitoSans") and size >= 26:
            line.kind = "h2"
        elif font.startswith("NunitoSans") and size >= 22:
            line.kind = "h3"
        elif font.startswith("NunitoSans") and size >= 17:
            line.kind = "h4"
        elif font == "NunitoSans-Regular" and size == 12.0 and asm.chapter is not None and not asm.chapter.blocks:
            line.kind = "lead"
        else:
            line.kind = "body"


class GrokkingBook:
    """Grokking the System Design Interview (a Word export with Georgia body text)."""

    first_page = 8
    margin = 72
    implicit_bullets = False

    def __init__(self):
        self.in_note = False

    def tables(self, page):
        # Word shades paragraphs with invisible white rects; they are not table borders.
        drawn = page.filter(lambda o: o.get("object_type") != "rect" or not is_white(o.get("non_stroking_color")) or (o.get("stroke") and not is_white(o.get("stroking_color"))))
        return drawn.find_tables({"vertical_strategy": "lines", "horizontal_strategy": "lines"})

    def figures(self, page, skip):
        out = []
        graphics = [g for g in visible_graphics(page) if not any(inside(g, s) for s in skip)]
        for band in bands(graphics, 10, page.height):
            top, bottom, x0, x1 = band
            has_image = any(o.get("object_type") == "image" and inside(o, band, 4) for o in graphics)
            if not has_image:
                shapes = [g for g in graphics if inside(g, band)]
                chars = [c for c in page.chars if inside(c, band) and x0 - 2 <= c["x0"] <= x1 + 2 and c["text"].strip()]
                text = [c for c in chars if base_font(c["fontname"]).startswith(("Georgia", "Arial", "Calibri", "Segoe"))]
                # Heading highlight bars and callout boxes are shapes around ordinary text.
                if bottom - top < 30 or len(shapes) < 3 or len(text) > 0.5 * max(1, len(chars)):
                    continue
            out.append([top, bottom, x0, x1])
        return out

    def classify(self, line: Line, asm: Assembler):
        font, size, text = line.font, line.size, line.text.strip()
        was_note = self.in_note
        self.in_note = False
        if font.startswith("Calibri") and size < 12:
            line.kind = "drop"
        elif font == "Calibri-Light" and size >= 21:
            line.kind = "part"
        elif font == "Calibri-Light" and size >= 15:
            line.kind = "title"
        elif font.startswith("Arial") and size >= 15:
            line.kind = "h2"
        elif font == "SegoeUISymbol":
            self.in_note = True
            line.kind = "drop"
        elif was_note and font.startswith("Georgia-Bold"):
            self.in_note = True
            line.kind = "note"
        elif font.startswith("TimesNewRoman") and size > 13 and asm.chapter is not None and not asm.chapter.blocks:
            line.kind = "lead"
        elif font.startswith("TimesNewRoman") and (text.startswith(("http", "www.")) or (asm.current is not None and asm.current.kind == "link")):
            line.kind = "link"
        elif font.startswith("Arial") and "Italic" in font and "Bold" not in font and size > 13 and len(text) < 40:
            line.kind = "h3"
        elif font.startswith("Arial") and "Bold" in font and len(text) < 60 and re.match(r"^([a-z]\.\s)?[A-Z][\w\s-]+$", text):
            line.kind = "h3"
        elif font.startswith("Consolas") and not NUMBER_RE.match(text):
            line.kind = "code"
        else:
            center = (line.x0 + line.x1) / 2
            centered = abs(center - asm.page_width / 2) < 30 and line.x0 > asm.margin + 40
            line.kind = "formula" if centered and len(text) < 70 else "body"


# --------------------------------------------------------------------------- notes (Markdown)

LATEX = {
    r"\Rightarrow": "⇒", r"\rightarrow": "→", r"\leftarrow": "←", r"\times": "×", r"\approx": "≈",
    r"\geq": "≥", r"\leq": "≤", r"\neq": "≠", r"\cdot": "·", r"\to": "→", r"\sim": "~",
}


def process_notes(path: Path) -> list[Chapter]:
    text = path.read_text(encoding="utf8").split("<!-- /TOC -->", 1)[-1]

    def latex(m: re.Match[str]) -> str:
        body = m.group(1)
        for k, v in LATEX.items():
            body = body.replace(k, v)
        return body.replace("{", "").replace("}", "").strip()

    chapters: list[Chapter] = []
    for chunk in re.split(r"^# ", text, flags=re.M)[1:]:
        title, _, body = chunk.partition("\n")
        title = re.sub(r"^\d+\.\s*", "", title.strip())
        body = re.sub(r"\$([^$\n]+)\$", latex, body)
        body = re.sub(r"^(#{2,4}) \d+(\.\d+)*\.?\s*", r"\1 ", body, flags=re.M)
        body = re.sub(r"^-{4,}\s*$", "", body, flags=re.M)
        body = re.sub(r"<(?!/?(br|sub|sup)\b)", "&lt;", body)  # the notes are Markdown, not HTML
        ch = Chapter(title=title, part="Notes")
        ch.blocks.append(Block(kind="raw", text=body.strip()))
        chapters.append(ch)
    return chapters


# --------------------------------------------------------------------------- output

def parse_lead(text: str) -> dict:
    """Splits "Similar services: ... Difficulty Level: Easy" out of a chapter's opening blurb."""
    text = re.sub(r"\s+", " ", text).strip()
    meta: dict = {}
    m = re.search(r"\s*Difficulty Level:\s*(\w+)\.?\s*$", text)
    if m:
        meta["difficulty"] = m.group(1).lower()
        text = text[: m.start()].strip()
    m = re.search(r"\s*Similar [Ss]ervices:\s*(.+?)\s*$", text)
    if m:
        meta["similar"] = re.sub(r"\s*(etc\.?|Difficulty)$", "", m.group(1)).rstrip(",. ")
        text = text[: m.start()].strip()
    if text:
        meta["lead"] = text
    return meta


def publish_source(book: str, source: Path) -> str:
    """Copies the original document next to the book so readers can download it."""
    original = source if source.suffix == ".pdf" else source.with_suffix(".pdf")
    if not original.is_file():
        original = source
    name = f"{book}{original.suffix.lower()}"
    target = ASSET_DIR / "sources" / name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(original, target)
    return f"{ASSET_URL}/sources/{name}"


def write_book(book: str, chapters: list[Chapter], source: Path):
    out = CONTENT_DIR / book
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    parts: list[dict] = []
    seen: set[str] = set()
    for ch in chapters:
        cid = slugify(ch.title)
        if cid in seen:
            cid = slugify(f"{ch.part} {ch.title}")
        base, n = cid, 2
        while cid in seen:
            cid, n = f"{base}-{n}", n + 1
        seen.add(cid)
        if not parts or parts[-1]["title"] != ch.part:
            parts.append({"title": ch.part, "chapters": []})
        entry = {"id": cid, "title": ch.title}
        entry.update(parse_lead(" ".join(ch.lead)))
        parts[-1]["chapters"].append(entry)
        md = ch.blocks[0].text + "\n" if ch.blocks[0].kind == "raw" else chapter_markdown(ch)
        (out / f"{cid}.md").write_text(md, encoding="utf8")
    index = {"id": book, **BOOKS[book], "source": source.name, "download": publish_source(book, source), "parts": parts}
    (out / "index.json").write_text(json.dumps(index, indent=1, ensure_ascii=False) + "\n", encoding="utf8")
    total = sum(len(p["chapters"]) for p in parts)
    print(f"✓ {book}: {len(parts)} parts, {total} chapters → {out.relative_to(ROOT)}")


def main(argv: list[str]):
    if len(argv) != 2 or argv[0] not in BOOKS:
        print(__doc__)
        sys.exit(1)
    book, source = argv[0], Path(argv[1]).expanduser()
    if not source.is_file():
        sys.exit(f"Not a file: {source}")
    if book == "notes":
        chapters = process_notes(source)
    else:
        chapters = process_pdf(book, source, AdvancedBook() if book == "advanced" else GrokkingBook())
    write_book(book, chapters, source)


if __name__ == "__main__":
    main(sys.argv[1:])
