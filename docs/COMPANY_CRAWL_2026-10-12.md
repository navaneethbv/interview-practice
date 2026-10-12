# Company-question refresh: October 12, 2026

The four names in the request are source websites. Target companies remain the nine existing company lists. This refresh adds 16 entries across eight lists, including six new runnable exercises; Meta has no verified new additions in this batch.

## Source coverage

| Website | What was checked | Imported entries | Limitations |
| --- | --- | ---: | --- |
| Hello Interview | Public rendered coding listing and card company labels | 7 | Static HTML alone did not populate the question cards. Last-asked labels aggregate all companies on a card, not an individual company. Six entries are original practice contracts; the seventh reuses Design Hit Counter. |
| 1point3acres | Public company-scoped coding-list links in crawl responses | 8 | Exact whole titles were matched against existing LeetCode catalog titles. Individual last-asked dates were not exposed. Members-only descriptions were excluded. |
| Gotham Loop | Public company guides and visible question previews | 1 | The Anthropic cache-expiry preview maps to the new TTL exercise. Concurrency is a follow-up. No individual interview date is available; promotional recency claims are not treated as verified dates. |
| interviewDB | Public company listings and two detail-page responses | 0 | Public titles and relative dates were visible, but fetched detail pages showed loading shells. The browser detail check stalled. No question was inferred from a vague title or imported from locked content. |

The initial direct robots probes for 1point3acres and interviewDB returned 403. The subsequent configured crawler received robots.txt and public listing responses with status 200. No credentials, cookies, hidden endpoints or membership workarounds were used.

## New runnable exercises

| Exercise | Company | Source last-asked label |
| --- | --- | --- |
| TTL Key-Value Store | NVIDIA; Anthropic preview also supports the topic | Early October, 2026 on Hello Interview; no individual date on Gotham Loop |
| Sliding-Window Rate Limiter | Amazon | Late September, 2026 |
| Circuit Breaker with a Failure Window | Uber | Mid September, 2026 |
| HTTP Route Matching | Google | Late August, 2026 |
| Follow Graph with Snapshots | OpenAI | Late August, 2026 |
| Maximum Coins From K Consecutive Bags | Amazon | Late September, 2026 |

The first five use locally defined APIs, boundary rules and constraints. They practice the reported topic, not every source follow-up. The interval problem is explicitly identified as LeetCode 3413 by the source. All six have original statements, two sample cases, at least eight hidden cases, and Python and Java references: 62 fixed cases total.

## Company additions

| Company | Added entries |
| --- | ---: |
| Amazon | 3 |
| Anthropic | 1 |
| Apple | 2 |
| Google | 3 |
| Microsoft | 3 |
| NVIDIA | 1 |
| OpenAI | 1 |
| Uber | 2 |

Nine entries reuse existing runnable problems: Design Hit Counter, Sparse Matrix Multiplication, Design Task Manager, Minimum Number of Refueling Stops, Angle Between Hands of a Clock, Number of Islands II, Maximum Profit in Job Scheduling, Count Binary Substrings and Alien Dictionary. The new TTL exercise appears in two company lists, so 16 list additions represent 15 distinct exercises.

## Reproduction and review

Live discovery command:

```bash
python3 -B scripts/ingest/company_crawler.py \
  --sources hellointerview,1point3acres,gothamloop,interviewdb \
  --cache /tmp/interview-practice-crawl --dry-run
```

Do not import that raw output automatically. It contained false positives such as mapping a minimum-rooms question to Meeting Rooms, a prime-step Jump Game variant to Jump Game, and minimum root-to-leaf sums to Path Sum.

The reviewed source of truth is `scripts/ingest/company_report_observations.json`. Every imported mapping retains its source URL and observation date. Exact 1point3acres question links are additionally recorded when present on the public listing. Rebuild without network access:

```bash
python3 -B scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
python3 -B scripts/ingest/company_crawler.py --reviewed
python3 -B scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
```

The existing UI category is named “Recent reports.” In this batch it means publicly observed during this refresh. It does not establish that undated questions were asked recently. Website-reported attribution and interview dates are not independently verified.
