"""Report authored coverage and the next missing problem in workbook priority order."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT = ROOT / 'content' / 'leetcode'
UNSUPPORTED = {193, 2619, 2620, 2667, 2703, 2704, 2879}
PRIORITY = ['blind-75', 'neetcode-150', 'grind-75', 'grind-169', 'meta', 'google', 'microsoft', 'apple', 'uber', 'amazon']
sets = json.loads((ROOT / 'content/sets/sets.json').read_text())
meta = json.loads((ROOT / 'content/sets/problems.json').read_text())
ready = set()
java = set()
readable_java = set()
walkthroughs = set()
coding = set()


def is_readable_java(source):
    """Formatting heuristic only, not an algorithm or editorial quality review."""
    lines = [line.strip() for line in source.splitlines() if line.strip()]
    return len(lines) > 3 and all(
        len(line) <= 120 and
        (';' not in line.rstrip(';') or line.startswith('for ('))
        for line in lines
    )

for file in CONTENT.glob('*.json'):
    spec = json.loads(file.read_text())
    slug = file.stem
    extension = 'sql' if spec.get('kind') == 'sql' else 'py'
    if slug in meta and spec.get('id') == slug and (CONTENT / f'{slug}.md').is_file() and (CONTENT / f'{slug}.{extension}').is_file() and spec.get('tests') and all('expected' in case for case in spec['tests']):
        ready.add(slug)
    if slug in meta and spec.get('kind') != 'sql':
        coding.add(slug)
        java_file = CONTENT / f'{slug}.java'
        if java_file.is_file():
            java.add(slug)
            if is_readable_java(java_file.read_text()):
                readable_java.add(slug)
    walkthrough = CONTENT / 'walkthroughs' / f'{slug}.md'
    if slug in ready and walkthrough.is_file() and walkthrough.read_text().strip():
        walkthroughs.add(slug)
ordered = []
for key in PRIORITY:
    item = next(s for s in sets if s['id'] == key)
    for row in item['items']:
        if row['slug'] not in ordered:
            ordered.append(row['slug'])
ordered.extend(slug for slug in meta if slug not in ordered)
missing = [slug for slug in ordered if slug not in ready]
report = {
    'available': len(ready), 'total': len(meta), 'java_references': len(java),
    'coding_problems': len(coding),
    'walkthroughs': len(walkthroughs),
    'readable_java_references': len(readable_java),
    'readable_java_definition': 'Formatting heuristic: more than 3 nonblank lines, at most 120 characters per line, no inline statements except for-loop headers. Manual review and judge verification are separate.',
    'lists': [{
        'id': s['id'], 'available': sum(i['slug'] in ready for i in s['items']),
        'total': len(s['items']),
        'coding_problems': sum(i['slug'] in coding for i in s['items']),
        'java_references': sum(i['slug'] in java for i in s['items']),
        'readable_java_references': sum(i['slug'] in readable_java for i in s['items']),
        'walkthroughs': sum(i['slug'] in walkthroughs for i in s['items']),
    } for s in sets],
    'next_walkthrough': next((s for s in ordered if s in ready and s not in walkthroughs), None),
    'next_java': next((s for s in ordered if s in coding and s not in java), None),
    'next_readable_java': next((s for s in ordered if s in coding and s not in readable_java), None),
    'next': next((s for s in missing if meta[s]['number'] not in UNSUPPORTED), None),
    'done': sorted(ready), 'missing': missing,
    'intentionally_unsupported': [s for s, m in meta.items() if m['number'] in UNSUPPORTED],
}
print(json.dumps(report, indent=2))
