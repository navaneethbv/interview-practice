Capacity estimates are a way to expose constraints early.
They do not need to be precise, but they should be internally consistent.

## Estimate the useful quantities

Start with active users, actions per user, peak-to-average traffic, average payload size, and retention period.
From those values, derive average requests per second, peak requests per second, daily bytes written, and the size of the retained dataset.
For a read-heavy workload, estimate the cacheable portion of traffic and the expected hit rate.
For a write-heavy workload, estimate queue depth, batch size, and the rate at which workers can drain work.

## Example model

Suppose a notification digest serves 200,000 active accounts.
If each account creates three events per day, the average write rate is only a few events per second, but a busy period may be many times higher.
If the digest is generated every hour, the read path may have a predictable burst at the top of each hour.
That pattern suggests smoothing writes with a queue and precomputing digest data rather than rebuilding every account synchronously.

## Leave room for reality

Use a peak multiplier, replication overhead, indexes, and temporary migration space when sizing storage.
Call out which estimate is uncertain.
An estimate is useful when it tells you whether one database, several partitions, or an asynchronous pipeline is a reasonable starting point.
