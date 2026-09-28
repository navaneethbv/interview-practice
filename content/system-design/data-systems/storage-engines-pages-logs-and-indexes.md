A storage engine turns logical records into bytes and must balance read cost, write cost, recovery, and space usage.
Memory is fast but limited, while durable storage is slower and must account for layout, caching, and failure.

## B-trees and ordered pages

B-trees keep keys in sorted pages and update a path from the root to a leaf.
They are a strong fit for point lookups and ordered range scans when updates should be visible in place.
Page size, fan-out, caching, and write amplification affect their practical behavior.

## Log-structured storage

An append-oriented engine writes new versions sequentially and later merges sorted runs.
This can make writes efficient, but reads may consult multiple structures until compaction consolidates them.
Bloom filters, sparse indexes, and compaction policy determine how much unnecessary work remains.

## The real tradeoff

Compare an engine by workload rather than by the name of its data structure.
Ask how it handles random writes, range scans, updates, deletes, compaction pauses, crashes, and recovery time.
