# Company sources reviewed: October 13, 2026

All nine existing company lists were reviewed against the five configured remote sources and the two local inputs. The refresh adds **1,076 company/problem memberships** covering 771 distinct problems. Of these memberships, 606 are runnable here; the others retain the site's “Coming soon” state and LeetCode link. This is a source refresh, not a claim that 1,076 interviews occurred recently.

## Source findings

| Source | Review and result | Date limitations |
| --- | --- | --- |
| [LeetCode community snapshot](https://github.com/snehasishroy/leetcode-companywise-interview-questions/tree/e095c259cfd036e3ddb6886e84d7075c2faac477) | Latest upstream HEAD checked: `e095c259cfd036e3ddb6886e84d7075c2faac477`. Imported its first three recency buckets for the six workbook companies; refreshed all buckets for NVIDIA, OpenAI and Anthropic. Adds 1,074 memberships. | README still dates the snapshot to **July 12, 2026**. “Last 30 days / 3 months / 6 months” are relative to that date. The August commit timestamp is not the interview or snapshot date. |
| [Hello Interview](https://www.hellointerview.com/community/questions) | Nine public company listings and seven previously reviewed detail pages fetched. Existing seven observations retained. Static listing HTML still did not expose the cards needed for new mappings. | Card observations and aggregate last-asked labels retain their October 12 review date. Detail pages were rechecked on October 13; this does not refresh a card's reported interview date. |
| [1point3acres](https://www.1point3acres.com/interview/problems) | Nine first-page company coding lists checked. 51 exact question-link observations support 49 company/problem pairs, including two new memberships after the snapshot merge: Microsoft / Basic Calculator III and Anthropic / Find All Possible Recipes From Given Supplies. No exact catalog match on the first OpenAI page. | No per-question interview date exposed on these coding links. Unknown titles, longer variants, members-only descriptions and guide prose are excluded. |
| [Gotham Loop](https://www.gothamloop.com/companies) | All seven configured public company guides checked. Existing Anthropic expiry-cache preview reconfirmed. Apple and NVIDIA have no configured guide. | No individual interview dates. Promotional update claims do not date a specific question. |
| [interviewDB](https://www.interviewdb.io/) | Nine public listing routes checked. Six exposed question links; Apple, Microsoft and NVIDIA did not. No additional mapping was accepted from an ambiguous custom title. | Relative date labels are not converted into precise interview dates. Detail contracts were not verified in this refresh. |
| Local workbook | Reimported its company sheets, preserving authored metadata and entries outside the selected snapshot buckets. | Workbook-only rows now say “Workbook · date unavailable” instead of implying current six-month coverage. |
| Local candidate-write-up extras | Four existing entries preserved for OpenAI and Anthropic. | Original source URLs and dates were not recorded, so fresh attribution could not be verified. |

The machine-readable audit is `scripts/ingest/company_source_review.json`: 41 public page responses, response status and content hashes. Raw page bodies are not committed. Coverage is the configured first listing page per company plus the seven Hello Interview details, not an exhaustive crawl of every page on each website.

## Company totals

| Company | Before | After | Added |
| --- | ---: | ---: | ---: |
| Meta | 225 | 391 | 166 |
| Google | 311 | 796 | 485 |
| Amazon | 662 | 816 | 154 |
| Apple | 300 | 306 | 6 |
| Microsoft | 221 | 452 | 231 |
| Uber | 185 | 218 | 33 |
| NVIDIA | 140 | 140 | 0 |
| OpenAI | 19 | 19 | 0 |
| Anthropic | 8 | 9 | 1 |

No previous company membership is removed. The reviewed manifest now holds 59 observations on 57 company/problem pairs. Evidence remains visible even when a problem also appears in a snapshot. Distinct question URLs on the same listing remain distinct evidence.

The recipe dependency question has a new original statement, Python and Java references, two samples and ten hidden cases. Cases cover missing raw ingredients, reverse-ordered chains, fan-in, shared supplies, cycles, self-dependencies and unrelated supplies. Basic Calculator III reuses its existing runnable exercise.

## Refresh improvements

- Live crawls print discovery JSON; only a complete `--reviewed` import can replace the checked report. Partial source/company imports and explicit report limits require `--dry-run`.
- Cache entries expire after 24 hours. `--cache-max-age 0` forces fresh requests. Offline replay preserves retrieval dates; legacy undated caches cannot invent one.
- Robots 401, 403, 429 and server errors block crawling; only missing robots files (404/410) permit unrestricted paths. Rate-limit failures are not cached as successes.
- 1point3acres uses whole visible question-link titles on the source host. Longer variants, ambiguous duplicate catalog titles and hidden templates do not match.
- Company tables expose source links, observed dates, source-reported last-asked labels and their scope. Undated entries use “Website reports,” which does not assert recent interviews.

## Reproduction

Check out the upstream snapshot at the pinned revision, then run from this repository:

```bash
python3 -B scripts/ingest/company_lists.py /path/to/snapshot \
  --snapshot-date 2026-07-12 \
  --revision e095c259cfd036e3ddb6886e84d7075c2faac477 --recent-only \
  meta=Meta google=Google amazon=Amazon apple=Apple microsoft=Microsoft uber=Uber
python3 -B scripts/ingest/company_lists.py /path/to/snapshot \
  --snapshot-date 2026-07-12 \
  --revision e095c259cfd036e3ddb6886e84d7075c2faac477 \
  nvidia=NVIDIA openai=OpenAI anthropic=Anthropic
python3 -B scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
python3 -B scripts/ingest/company_crawler.py --reviewed
python3 -B scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
```

For a future live review:

```bash
python3 -B scripts/ingest/company_crawler.py \
  --sources leetcode,hellointerview,1point3acres,gothamloop,interviewdb \
  --cache /tmp/interview-practice-crawl --cache-max-age 0 > /tmp/discovery.json
```

Review exact source evidence before updating the observation manifest. Discovery results from generic extractors are candidates, not accepted company attribution.

## Validation

- Lint, TypeScript checking and the production build passed.
- `npm test`: 130 TypeScript tests passed; six Go tests skipped because the toolchain is unavailable. All 58 Python ingestion tests passed.
- Full reference verification: 1,224 specs, zero problems; 1,155 Python, 1,161 Java and 63 SQLite reference executions. The new recipe exercise also passed its focused Python/Java check.
- Rebuilding the reviewed report and generated content offline produced byte-for-byte identical files. All previous company memberships remain present, with no duplicate memberships.
- Production HTTP checks returned 200 for Meta, Microsoft, Anthropic, Google and NVIDIA lists, with the snapshot note in rendered HTML and source evidence in the hydration payload. The new recipe route returned 200.
- Interactive desktop/mobile browser checks remain unverified: no Browser plugin is installed, and Playwright's Chromium download returned an invalid archive. HTTP checks do not establish visual layout, console health or expand/collapse interaction behavior.
