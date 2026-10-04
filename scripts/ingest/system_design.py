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
    python3 scripts/ingest/system_design.py ctci "scripts/ingest/ctci_system_design.md"
    python3 scripts/ingest/system_design.py data-systems "scripts/ingest/data_systems_notes.md"
    python3 scripts/ingest/system_design.py domain-design "scripts/ingest/domain_design_notes.md"
    python3 scripts/ingest/system_design.py linux-operations "scripts/ingest/linux_operations_notes.md"
    python3 scripts/ingest/system_design.py alex-xu "scripts/ingest/alex_xu_system_design_notes.md"
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
        "sourceName": "Grokking the Advanced System Design Interview.pdf",
    },
    "notes": {
        "title": "System Design Interview Notes",
        "short": "Condensed Notes",
        "description": "Junfan Zhu's condensed review notes of the classic course, for a fast refresher before an interview.",
    },
    "ctci": {
        "title": "CTCI System Design Notes",
        "short": "CTCI System Design",
        "description": "Original notes inspired by the system design chapter of Cracking the Coding Interview, focused on turning an open-ended prompt into a scoped, scalable, and defensible design. This is a private study aid, not a reproduction of the book.",
        "sourceUrl": "https://www.crackingthecodinginterview.com/",
        "sourceLabel": "Official CTCI site",
    },
    "data-systems": {
        "title": "Data Systems Notes",
        "short": "Data Systems",
        "description": "Original notes on reliable data-intensive applications, storage engines, replication, partitioning, and data processing.",
        "sourceLinks": [
            {"label": "DDIA official site", "url": "https://dataintensive.net/"},
            {"label": "Database Internals on O'Reilly", "url": "https://www.oreilly.com/library/view/database-internals/9781492040330/"},
        ],
    },
    "domain-design": {
        "title": "Domain and Software Design Notes",
        "short": "Domain Design",
        "description": "Original notes on managing software complexity with simpler designs, useful domain models, and explicit boundaries.",
        "sourceLinks": [
            {"label": "Code Simplicity", "url": "https://www.codesimplicity.com/"},
            {"label": "Domain Language", "url": "https://www.domainlanguage.com/"},
        ],
    },
    "linux-operations": {
        "title": "Linux and Operations Notes",
        "short": "Linux and Operations",
        "description": "Original operational notes covering the shell, processes, filesystems, networking, services, observability, and safe administration.",
        "sourceLinks": [
            {"label": "Linux Pocket Guide", "url": "https://www.oreilly.com/library/view/linux-pocket-guide/9781098157951/"},
            {"label": "UNIX and Linux Administration Handbook", "url": "https://www.admin.com/"},
        ],
    },
    "alex-xu": {
        "title": "System Design Interview Notes",
        "short": "System Design Interview",
        "description": "Original interview-focused notes on estimation, reusable distributed-system building blocks, and common design follow-ups.",
        "sourceLinks": [
            {"label": "ByteByteGo", "url": "https://bytebytego.com/"},
        ],
    },
    "behavioral": {
        "title": "Behavioral and Leadership Interviews",
        "short": "Behavioral Interviews",
        "description": "Build a factual story bank, practice conflict and failure discussions, and rehearse senior technical decisions with review rubrics.",
        "sourceLinks": [{"label": "Amazon interview preparation", "url": "https://amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep"}],
    },
    "low-level-design": {
        "title": "Low-Level Design Practice",
        "short": "Low-Level Design",
        "description": "Work through parking lots, elevators, vending machines, and schedulers with ownership diagrams, invariants, failure cases, and tests.",
        "sourceLinks": [{"label": "Amazon technical topics", "url": "https://amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics"}],
    },
    "ai-design": {
        "title": "AI System Design Practice",
        "short": "AI System Design",
        "description": "Design document retrieval and support assistants, evaluate outcomes, and reason about access, freshness, latency, cost, and bounded actions.",
        "sourceLinks": [{"label": "Anthropic engineering", "url": "https://www.anthropic.com/engineering/building-effective-agents"}],
    },
    "testing-debugging": {
        "title": "Testing, Debugging, and Code Review",
        "short": "Testing and Debugging",
        "description": "Practice independent test oracles, debug binary search, review a concurrency defect, and rehearse a complete coding interview.",
        "sourceLinks": [{"label": "Microsoft technical interviews", "url": "https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html"}],
    },
}

MARKDOWN_BOOKS = set(BOOKS) - {"grokking", "advanced"}


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


PAREN_URL = re.compile(r" ?\((?:https?://|www\.)[^)]*\)")
HTTPS = "https://"
URL_START = re.compile(r"https?://")  # matches example URLs in text; nothing is fetched
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


def near(value: float, target: float) -> bool:
    """Font sizes come from PDF matrices, so compare them with a tolerance."""
    return abs(value - target) < 0.05


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


def line_spans(chars: list[dict]) -> tuple[list[Span], dict[tuple[str, float], int]]:
    """Groups a line's characters into styled runs and counts which font the line is set in."""
    spans: list[Span] = []
    prev = None
    weights: dict[tuple[str, float], int] = {}
    for c in chars:
        text = decode_char(c["text"]).replace("\xa0", " ").replace("\uf0b7", "•")
        style = font_style(c["fontname"])
        gap = prev is not None and c["x0"] - prev["x1"] > 0.18 * c["size"]
        if gap and text != " " and not spans[-1].text.endswith(" "):
            spans.append(Span(" ", ""))
        if spans and spans[-1].style == style:
            spans[-1].text += text
        else:
            spans.append(Span(text, style))
        if text.strip():
            key = (base_font(c["fontname"]), round(c["size"], 1))
            weights[key] = weights.get(key, 0) + 1
        prev = c
    return spans, weights


def build_line(page_no: int, chars: list[dict]) -> Line | None:
    # extract_text_lines repeats a char once per character of its text, e.g. 8x for "(cid:18)".
    unique = {(c["x0"], c["top"], c["text"]): c for c in chars if c["text"] not in ("\n", "\r")}
    chars = sorted(unique.values(), key=lambda c: c["x0"])
    if not chars:
        return None
    spans, weights = line_spans(chars)
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
    return [o for kind in ("rects", "curves", "lines", "images") for o in getattr(page, kind) if draws_something(page, kind, o)]


def draws_something(page, kind: str, o: dict) -> bool:
    w, h = o["x1"] - o["x0"], o["bottom"] - o["top"]
    if kind == "images":
        return w >= 40 and h >= 10  # code signatures are exported as 18pt-tall strips
    if w > page.width * 0.85 and h > page.height * 0.4:
        return False  # page background
    stroked = o.get("stroke") and not is_white(o.get("stroking_color"))
    filled = o.get("fill") and not is_white(o.get("non_stroking_color"))
    if not stroked and not filled:
        return False
    return not (kind == "rects" and h < 2.5 and w < page.width * 0.6)  # link underline


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
    name = hashlib.sha1(data, usedforsecurity=False).hexdigest()[:16] + ".webp"
    out = ASSET_DIR / book
    out.mkdir(parents=True, exist_ok=True)
    (out / name).write_bytes(data)
    fig.src = f"{ASSET_URL}/{book}/{name}"


# --------------------------------------------------------------------------- assembly

BULLET_RE = re.compile(r"^\s*([•●▪◦○■□–]|o(?=\s))\s*")
NUMBER_RE = re.compile(r"^\s*(\d{1,2})[.)]\s+")
PARAM_RE = re.compile(r"^[a-z][a-z0-9_]* \([a-z ]+\):")  # "api_dev_key (string): ..."


def trailing_word(text: str) -> str:
    """The ASCII letters at the end of text, e.g. "de" for "the de"."""
    start = len(text)
    while start and text[start - 1].isascii() and text[start - 1].isalpha():
        start -= 1
    return text[start:]


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
        tail = trailing_word(prev_text[:-1]) if prev_text.endswith("-") else ""
        head = re.match(r"[a-z]+", first)
        if tail and head:
            # Word-processor hyphenation: drop the hyphen only when that forms a word.
            if is_word(tail + head.group(0)) and not is_word(head.group(0)):
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
        if line.kind == "caption" and self.attach_caption(line):
            return
        handler = {
            "h2": self.add_heading_line,
            "h3": self.add_heading_line,
            "h4": self.add_heading_line,
            "lead": self.add_lead,
            "code": self.add_code,
            "formula": self.add_formula,
            "link": self.add_link,
        }.get(line.kind, self.add_text)
        handler(line)

    def same_page_close(self, line: Line) -> bool:
        last = self.last
        return last is not None and last.page == line.page and line.top - last.bottom < 1.2 * line.size

    def add_heading_line(self, line: Line):
        self.add_heading(line, int(line.kind[1]))

    def add_lead(self, line: Line):
        self.flush()
        self.chapter.lead.append(line.text.strip())
        self.last = line

    def attach_caption(self, line: Line) -> bool:
        """Captions follow their figure; one without a figure reads as body text."""
        self.flush()
        prev = self.chapter.blocks[-1] if self.chapter.blocks else None
        if prev is not None and prev.kind == "fig":
            prev.caption = f"{prev.caption} {line.text.strip()}".strip()
            return True
        line.kind = "body"
        return False

    def add_code(self, line: Line):
        indent = 0
        if self.current and self.current.kind == "code":
            indent = max(0, round((line.x0 - self.current.number) / (line.size * 0.55)))
        self.add_run("code", line, " " * indent + line.text.rstrip(), "\n", self.same_page_close(line))

    def add_formula(self, line: Line):
        joins = self.same_page_close(line) and self.last.kind == "formula"
        self.add_run("formula", line, line.text.strip(), "\n", joins)

    def add_link(self, line: Line):
        text = line.text.strip()
        joins = self.current is not None and self.current.kind == "link" and not (URL_START.match(text) or text.startswith("www."))
        self.add_run("link", line, text, "", joins)

    def start_block(self, line: Line, block: Block):
        self.flush()
        self.current = block
        self.last = line

    def list_item(self, line: Line, spans: list[Span]) -> Block | None:
        """Returns the list item a line starts, with its marker removed, or None."""
        text = line.text
        if PARAM_RE.match(text) and line.kind == "body":
            return Block(kind="li", spans=spans, depth=0)
        marker = BULLET_RE.match(text)
        if marker and (marker.group(1) != "o" or line.x0 > self.margin + 10):
            return Block(kind="li", spans=strip_prefix(spans, marker.end()), depth=self.list_depth(line.x0))
        number = NUMBER_RE.match(text)
        if number and line.kind != "note":
            return Block(kind="ol", spans=strip_prefix(spans, number.end()), depth=self.list_depth(line.x0), number=int(number.group(1)))
        return None

    def continues_list(self, line: Line, spans: list[Span]) -> bool:
        block = self.current
        if not block or block.kind not in ("li", "ol"):
            return False
        if not "".join(s.text for s in block.spans).strip():
            block.spans = spans  # the bullet glyph sat alone on its line
            self.last = line
            return True
        item_x = self.list_x[-1] if self.list_x else self.margin
        if (line.x0 > item_x - 4 or self.last.page != line.page) and self.continues(line):
            self.append(line, spans)
            return True
        return False

    def add_text(self, line: Line):
        spans = [Span(s.text, s.style) for s in line.spans]
        if line.kind == "note":
            if self.current and self.current.kind == "note":
                self.append(line, spans)
            else:
                self.start_block(line, Block(kind="note", spans=spans))
            return
        item = self.list_item(line, spans)
        if item:
            self.start_block(line, item)
            return
        if self.continues_list(line, spans):
            return
        if self.current and self.current.kind == "p" and self.continues(line):
            self.append(line, spans)
            return
        self.flush()
        if line.x0 <= self.margin + 8:
            self.list_x = []
        elif self.implicit_bullets and line.x0 > self.margin + 20:
            self.start_block(line, Block(kind="li", spans=spans, depth=self.list_depth(line.x0)))
            return
        self.start_block(line, Block(kind="p", spans=spans))

    def finish(self) -> list[Chapter]:
        self.flush()
        return [c for c in self.chapters if c.blocks]


# --------------------------------------------------------------------------- markdown

def merge_spans(spans: list[Span]) -> list[Span]:
    """Joins neighbouring runs of the same style; whitespace joins whatever precedes it."""
    merged: list[Span] = []
    for s in spans:
        style = s.style if s.text.strip() else ""
        if merged and (merged[-1].style == style or not s.text.strip()):
            merged[-1].text += s.text
        elif s.text:
            merged.append(Span(s.text, style))
    return merged


EMPHASIS = {"bi": "***", "ib": "***", "b": "**", "i": "*"}


def span_md(span: Span) -> str:
    text = re.sub(r"\s+", " ", span.text)
    if not span.style:
        # Example URLs in prose read as code, not as links out of the book.
        return "".join(f"`{part}`" if URL_RE.fullmatch(part) else md_escape(part) for part in URL_SPLIT.split(text))
    core = text.strip()
    lead = text[: len(text) - len(text.lstrip())]
    trail = text[len(text.rstrip()):]
    if "c" in span.style:
        fence = "``" if "`" in core else "`"
        return f"{lead}{fence}{core}{fence}{trail}"
    mark = EMPHASIS.get(span.style, "")
    return f"{lead}{mark}{md_escape(core)}{mark}{trail}"


def spans_to_md(spans: list[Span]) -> str:
    out = "".join(span_md(s) for s in merge_spans(spans))
    out = PAREN_URL.sub("", out)
    out = re.sub(r"\*\*([:.,;])\*\*", r"\1", out)  # a bolded colon after a bold term
    out = re.sub(r"(`) ([.,;:!?)])", r"\1\2", out)  # the code font's padding read as a space
    return re.sub(r" {2,}", " ", out).strip()


def plain(spans: list[Span]) -> str:
    return re.sub(r"\s+", " ", "".join(s.text for s in spans)).strip()


def paragraph_md(b: Block, ch: Chapter) -> str:
    text = plain(b.spans)
    if URL_START.match(text) and len(text.split()) <= 3:
        text = text.replace(" ", "")  # a long example URL wrapped across lines
    return f"`{text}`" if BARE_URL.match(text) else escape_block_start(spans_to_md(b.spans))


def list_item_md(b: Block, ch: Chapter) -> str:
    md = spans_to_md(b.spans)
    marker = f"{b.number}." if b.kind == "ol" else "-"
    return f"{'   ' * b.depth}{marker} {md}" if md else ""


def note_md(b: Block, ch: Chapter) -> str:
    md = spans_to_md(b.spans)
    return f"> {md}" if md else ""


def link_md(b: Block, ch: Chapter) -> str:
    url = b.text if b.text.startswith("http") else HTTPS + b.text
    return f"- <{url}>"


def figure_md(b: Block, ch: Chapter) -> str:
    f = b.fig
    alt = html_escape(b.caption or f"Diagram: {ch.title}")
    img = f'<img src="{f.src}" width="{f.width}" height="{f.height}" alt="{alt}" loading="lazy">'
    caption = f"<figcaption>{html_escape(b.caption)}</figcaption>" if b.caption else ""
    return f"<figure>{img}{caption}</figure>"


BLOCK_MD = {
    "h2": lambda b, ch: f"## {md_escape(b.text)}",
    "h3": lambda b, ch: f"### {md_escape(b.text)}",
    "h4": lambda b, ch: f"#### {md_escape(b.text)}",
    "p": paragraph_md,
    "li": list_item_md,
    "ol": list_item_md,
    "note": note_md,
    "code": lambda b, ch: "```\n" + b.text.rstrip() + "\n```",
    "formula": lambda b, ch: "```text\n" + b.text + "\n```",
    "link": link_md,
    "table": lambda b, ch: table_html(b.rows, b.header),
    "fig": figure_md,
}
# Consecutive blocks of these groups render as one tight list.
LIST_GROUP = {"li": "list", "ol": "list", "link": "link"}


def chapter_markdown(ch: Chapter) -> str:
    out: list[str] = []
    prev_group = None
    for b in ch.blocks:
        piece = BLOCK_MD[b.kind](b, ch)
        group = LIST_GROUP.get(b.kind)
        if piece and group and group == prev_group and out:
            out[-1] += "\n" + piece
        elif piece:
            out.append(piece)
        prev_group = group
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
    """Drops the "#" anchor the advanced course prints after headings and a "(*New*)" badge."""
    text = text.strip()
    for suffix in ("#", "(*New*)"):
        if text.endswith(suffix):
            text = text[: -len(suffix)].rstrip()
    return text


def page_items(cfg, raw_page, page_no: int) -> list[tuple[float, object]]:
    """A page's tables, figures and text lines in reading order."""
    page = raw_page.dedupe_chars()
    items: list[tuple[float, object]] = []
    skip: list[list[float]] = []
    for t in (cfg.tables(page) if cfg.has_tables else []):
        table = read_table(page, page_no, t)
        if table:
            items.append((table.top, table))
            skip.append([t.bbox[1], t.bbox[3], t.bbox[0], t.bbox[2]])
    pad = 6
    for top, bottom, x0, x1 in cfg.figures(page, skip):
        items.append((top, render_region(raw_page, page_no, (x0 - pad, top - pad, x1 + pad, bottom + pad))))
        skip.append([top, bottom, x0, x1])
    items += [(line.top, line) for line in page_lines(page, page_no, skip)]
    return sorted(items, key=lambda it: it[0])


def feed_line(asm: Assembler, cfg, line: Line):
    cfg.classify(line, asm)
    if line.kind == "part":
        asm.start_part(line.text.strip())
    elif line.kind == "title":
        if asm.last is not None and asm.last.kind == "title" and asm.last.page == line.page:
            asm.extend_title(line.text)
        else:
            asm.start_chapter(clean_title(line.text))
        asm.last = line
    elif line.kind != "drop":
        asm.add_line(line)


def feed_item(asm: Assembler, cfg, item: object):
    if isinstance(item, Figure):
        asm.add_block(Block(kind="fig", fig=item))
    elif isinstance(item, Table):
        asm.add_block(Block(kind="table", rows=item.rows, header=item.header))
    else:
        feed_line(asm, cfg, item)


def save_figures(book: str, chapters: list[Chapter]):
    assets = ASSET_DIR / book
    if assets.exists():
        shutil.rmtree(assets)
    for ch in chapters:
        ch.blocks = stitch_figures(ch.blocks)
        for b in ch.blocks:
            if b.kind == "fig":
                save_figure(book, b.fig)


def process_pdf(book: str, path: Path, cfg) -> list[Chapter]:
    import pdfplumber

    with pdfplumber.open(path) as pdf:
        asm = Assembler(cfg.margin, pdf.pages[0].width, cfg.implicit_bullets)
        for index, raw_page in enumerate(pdf.pages):
            if index + 1 >= cfg.first_page:
                for _, item in page_items(cfg, raw_page, index + 1):
                    feed_item(asm, cfg, item)
            raw_page.flush_cache()
    chapters = asm.finish()
    save_figures(book, chapters)
    return chapters


# --------------------------------------------------------------------------- books

class AdvancedBook:
    """Grokking the Advanced System Design Interview (a Chrome print of the course pages)."""

    first_page = 2
    margin = 58
    implicit_bullets = True
    has_tables = False
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

    def figures(self, page, skip):
        graphics = [g for g in visible_graphics(page) if not any(inside(g, s) for s in skip)]
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

    def boilerplate(self, line: Line) -> str | None:
        """Classifies navigation, page numbers, captions and the lesson contents panel."""
        font, size = line.font, line.size
        if font == "NunitoSans-Bold" and near(size, 11.3):
            self.after_nav = True  # the Back / Next buttons that end every lesson
            return "drop"
        if font == "NunitoSans-Regular" and near(size, 10.5):
            return "caption" if line.x0 > self.margin + 20 and not self.after_nav else "drop"
        if font == "unknown":
            return "drop"
        if font == "NunitoSans-Bold" and line.text.strip().startswith("We'll cover the following"):
            self.in_toc = True
            return "drop"
        if self.in_toc and font == "NunitoSans-Regular" and near(size, 13.5):
            return "drop"
        self.in_toc = False
        return None

    def classify(self, line: Line, asm: Assembler):
        kind = self.boilerplate(line)
        if kind:
            line.kind = kind
            return
        # Lessons open on a fresh page with the title at a fixed offset; a section that
        # merely lands at the top of a page sits higher (top ~37).
        at_title_slot = 44 <= line.top <= 56 and (asm.last is None or asm.last.page != line.page)
        starts_lesson = self.after_nav or at_title_slot or (asm.last is not None and asm.last.kind == "title")
        self.after_nav = False
        if line.font.startswith("NunitoSans") and 22 <= line.size < 23 and starts_lesson:
            title = clean_title(line.text)
            if title in self.PART_STARTS:
                asm.start_part(self.PART_STARTS[title])
            line.kind = "title"
        else:
            line.kind = self.content_kind(line, asm)

    @staticmethod
    def content_kind(line: Line, asm: Assembler) -> str:
        """Section headings, the lesson's opening line, or body text."""
        if line.font.startswith("NunitoSans") and line.size >= 17:
            return heading_level(line.size)
        if line.font == "NunitoSans-Regular" and near(line.size, 12.0) and asm.chapter is not None and not asm.chapter.blocks:
            return "lead"
        return "body"


def heading_level(size: float) -> str:
    """The advanced course sets sections larger than its lesson titles."""
    if size >= 26:
        return "h2"
    if size >= 22:
        return "h3"
    return "h4"


class GrokkingBook:
    """Grokking the System Design Interview (a Word export with Georgia body text)."""

    first_page = 8
    margin = 72
    implicit_bullets = False
    has_tables = True

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
        was_note = self.in_note
        self.in_note = False
        line.kind = self.structure_kind(line) or self.text_kind(line, asm, was_note)

    @staticmethod
    def structure_kind(line: Line) -> str | None:
        """Page furniture, parts, chapter titles and section headings."""
        font, size = line.font, line.size
        if font.startswith("Calibri") and size < 12:
            return "drop"
        if font == "Calibri-Light" and size >= 21:
            return "part"
        if font == "Calibri-Light" and size >= 15:
            return "title"
        if font.startswith("Arial") and size >= 15:
            return "h2"
        return None

    def text_kind(self, line: Line, asm: Assembler, was_note: bool) -> str:
        font, size, text = line.font, line.size, line.text.strip()
        if font == "SegoeUISymbol":
            self.in_note = True  # the lightbulb that opens a tip
            return "drop"
        if was_note and font.startswith("Georgia-Bold"):
            self.in_note = True
            return "note"
        if font.startswith("TimesNewRoman"):
            return self.times_kind(line, asm)
        if font.startswith("Arial") and is_subheading(font, size, text):
            return "h3"
        if font.startswith("Consolas") and not NUMBER_RE.match(text):
            return "code"
        centered = abs((line.x0 + line.x1) / 2 - asm.page_width / 2) < 30 and line.x0 > asm.margin + 40
        return "formula" if centered and len(text) < 70 else "body"

    @staticmethod
    def times_kind(line: Line, asm: Assembler) -> str:
        """Times New Roman sets a chapter's opening blurb and the reference link list."""
        text = line.text.strip()
        if line.size > 13 and asm.chapter is not None and not asm.chapter.blocks:
            return "lead"
        if text.startswith(("http", "www.")) or (asm.current is not None and asm.current.kind == "link"):
            return "link"
        return "body"


def is_subheading(font: str, size: float, text: str) -> bool:
    if "Italic" in font and "Bold" not in font:
        return size > 13 and len(text) < 40
    return "Bold" in font and len(text) < 60 and re.match(r"^([a-z]\.\s)?[A-Z][\w\s-]+$", text) is not None


# --------------------------------------------------------------------------- notes (Markdown)

LATEX = {
    r"\Rightarrow": "⇒", r"\rightarrow": "→", r"\leftarrow": "←", r"\times": "×", r"\approx": "≈",
    r"\geq": "≥", r"\leq": "≤", r"\neq": "≠", r"\cdot": "·", r"\to": "→", r"\sim": "~",
}


def escape_note_html(body: str) -> str:
    """Escape prose HTML without turning code comparisons into literal entities."""
    lines = []
    fence = None
    for line in body.splitlines(keepends=True):
        marker = re.match(r"^ {0,3}(`{3,}|~{3,})(.*)$", line)
        if fence:
            lines.append(line)
            if marker and marker[1][0] == fence[0] and len(marker[1]) >= len(fence) and not marker[2].strip():
                fence = None
        elif marker:
            fence = marker[1]
            lines.append(line)
        else:
            lines.append(re.sub(r"<(?!/?(br|sub|sup)\b)", "&lt;", line))
    return "".join(lines)


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
        body = escape_note_html(body)
        ch = Chapter(title=title, part="Notes")
        ch.blocks.append(Block(kind="raw", text=body.strip()))
        chapters.append(ch)
    return chapters


# --------------------------------------------------------------------------- output

def parse_lead(text: str) -> dict:
    """Splits "Similar services: ... Difficulty Level: Easy" out of a chapter's opening blurb."""
    text = " ".join(text.split())
    meta: dict = {}
    head, found, level = text.rpartition("Difficulty Level:")
    if found and level.strip().rstrip(".").isalpha():
        meta["difficulty"] = level.strip().rstrip(".").lower()
        text = head.strip()
    similar = re.search(r"Similar [Ss]ervices:", text)
    if similar:
        value = text[similar.end():].strip()
        for suffix in ("Difficulty", "etc.", "etc"):
            value = value.removesuffix(suffix).strip()
        meta["similar"] = value.rstrip(",. ")
        text = text[: similar.start()].strip()
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
    if original.resolve() != target.resolve():
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
    index = {"id": book, **BOOKS[book], "source": BOOKS[book].get("sourceName", source.name)}
    index.pop("sourceName", None)
    if source.suffix == ".pdf" or source.with_suffix(".pdf").is_file():
        index["download"] = publish_source(book, source)
    index["parts"] = parts
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
    if book in MARKDOWN_BOOKS:
        chapters = process_notes(source)
    else:
        chapters = process_pdf(book, source, AdvancedBook() if book == "advanced" else GrokkingBook())
    apply_editorial_updates(book, chapters)
    write_book(book, chapters, source)


def apply_editorial_updates(book: str, chapters: list[Chapter]):
    """Keep historical Kafka imports versioned and corrections reproducible."""
    if book != "advanced":
        return
    updates = {ch.title: ch for ch in process_notes(Path(__file__).with_name("kafka_updates.md"))}
    missing = updates.keys() - {ch.title for ch in chapters if ch.part == "Kafka"}
    if missing:
        raise ValueError(f"Kafka update titles not found in source: {sorted(missing)}")
    for chapter in chapters:
        if chapter.part != "Kafka":
            continue
        if chapter.title in updates:
            chapter.blocks = updates[chapter.title].blocks
        else:
            # Keep the imported diagrams explicitly historical instead of presenting
            # ZooKeeper-era topology as current Kafka architecture.
            body = chapter_markdown(chapter)
            note = (
                "> **Historical architecture:** This imported chapter describes the ZooKeeper-era design.\n"
                "> Kafka 4.0 and later use KRaft; consult the updated Role of ZooKeeper, Controller Broker, "
                "and Kafka Delivery Semantics chapters in this collection.\n"
                "> [Apache Kafka upgrade documentation](https://kafka.apache.org/40/getting-started/upgrade/)\n\n"
            )
            chapter.blocks = [Block(kind="raw", text=(note + body).rstrip())]


if __name__ == "__main__":
    main(sys.argv[1:])
