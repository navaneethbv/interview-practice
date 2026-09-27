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
for file in CONTENT.glob('*.json'):
    spec = json.loads(file.read_text())
    slug = file.stem
    extension = 'sql' if spec.get('kind') == 'sql' else 'py'
    if slug in meta and spec.get('id') == slug and (CONTENT / f'{slug}.md').is_file() and (CONTENT / f'{slug}.{extension}').is_file() and spec.get('tests') and all('expected' in case for case in spec['tests']):
        ready.add(slug)
    if slug in meta and (CONTENT / f'{slug}.java').is_file():
        java.add(slug)
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
    'lists': [{'id': s['id'], 'available': sum(i['slug'] in ready for i in s['items']), 'total': len(s['items'])} for s in sets],
    'next': next((s for s in missing if meta[s]['number'] not in UNSUPPORTED), None),
    'done': sorted(ready), 'missing': missing,
    'intentionally_unsupported': [s for s, m in meta.items() if m['number'] in UNSUPPORTED],
}
print(json.dumps(report, indent=2))
