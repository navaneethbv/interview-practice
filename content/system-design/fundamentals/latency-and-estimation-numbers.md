## Approximate latencies

| Operation | Time |
| --- | --- |
| L1 cache reference | ~1 ns |
| Main memory reference | ~100 ns |
| Read 1 MB sequentially from memory | ~10 µs to a few tens of µs |
| Round trip within a data center | ~0.5 ms |
| SSD random read | ~20 to 100 µs |
| Read 1 MB sequentially from SSD | ~0.1 to 1 ms |
| HDD seek | ~5 to 10 ms |
| Round trip across a continent | ~30 to 80 ms |
| Round trip across an ocean | ~100 to 150 ms |

Exact values vary by hardware; the orders of magnitude are what matter in an interview.

## Handy conversions

- One day is 86,400 seconds; use 100,000 for quick estimates.
- 1 million requests per day is about 12 per second; 1 billion per day is about 12,000 per second.
- Peak traffic is often 2 to 10 times the average.
- 1 KB per record times 1 billion records is 1 TB.

## A worked estimate

A photo app has 50 million daily users who each upload 2 photos of 2 MB.
Uploads: 100 million per day, about 1,200 per second on average and perhaps 5,000 at peak.
Storage: 200 TB per day, about 73 PB per year before replication.
That number alone says the design needs object storage, tiering to colder storage, and probably resized derivatives served from a CDN.
