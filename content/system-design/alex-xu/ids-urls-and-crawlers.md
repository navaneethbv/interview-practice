An ID service should define uniqueness, ordering, generation location, clock behavior, and the amount of information exposed in the identifier.
Time-based IDs can help ordered storage but require care when clocks move backward.

A URL shortener needs an ownership rule, collision handling, redirect latency, abuse controls, and analytics that do not slow redirects.
A crawler needs frontier management, politeness limits, deduplication, canonicalization, content limits, and a way to resume after failure.

## Separate hot and cold work

Redirects and crawl scheduling belong on a fast path, while analytics, previews, parsing, and reprocessing can move to queues.
The design should state which results are immediate and which are eventually consistent.
