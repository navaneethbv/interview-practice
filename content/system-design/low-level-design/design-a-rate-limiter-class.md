## Prompt and scope

Implement `allow(client_id) -> bool` that permits at most `limit` requests per client per `window` seconds.
This is the in-process, object-oriented version; the distributed version appears in the system design guides.

## Choosing an algorithm

| Algorithm | Memory per client | Burst behavior |
| --- | --- | --- |
| Fixed window counter | O(1) | Up to 2x limit across a window edge |
| Sliding window log | O(limit) | Exact |
| Sliding window counter | O(1) | Approximate, smooth |
| Token bucket | O(1) | Allows bursts up to capacity, then a steady rate |

## Token bucket implementation

```python
class TokenBucket:
    def __init__(self, capacity, refill_per_second, clock=time.monotonic):
        self.capacity, self.rate, self.clock = capacity, refill_per_second, clock
        self.buckets = {}  # client -> (tokens, last_refill)
        self.lock = threading.Lock()

    def allow(self, client):
        with self.lock:
            now = self.clock()
            tokens, last = self.buckets.get(client, (self.capacity, now))
            tokens = min(self.capacity, tokens + (now - last) * self.rate)
            allowed = tokens >= 1
            self.buckets[client] = (tokens - 1 if allowed else tokens, now)
            return allowed
```

Inject the clock so tests can advance time without sleeping.
A single lock is simple; per-client locks or striped locks reduce contention.

## Tests and follow-up

Test the first request, exhausting the bucket, refill after time passes, capacity cap after a long idle period, and concurrent calls for one client.
Follow-ups: evicting idle clients to bound memory, different limits per plan, and returning a retry-after time.
