## Intuition

The lookup asks two membership questions: whether an IP hosts the domain and whether that domain owns the subdomain.
Two mappings of sets model these relationships directly without parsing or combining names.

## Brute force

Keeping only registration lists would require scanning potentially many domains and subdomains for each query.
Hash-based membership makes repeated queries efficient.

## Approach

`domains_at` maps each IP to its registered domain set.
`subdomains` maps each domain to its subdomain set.
Registering a domain inserts it into the IP's set and initializes its subdomain set.
Registering a subdomain inserts into that domain's set, relying on the stated prior-registration guarantee.
A query returns the conjunction of both membership tests, using empty default sets for missing keys.
The first condition prevents a valid subdomain from being reported under the wrong host IP.

## Walkthrough

```text
Input: ops = ["register_domain", "register_subdomain", "has_subdomain", "has_subdomain"], args = [["1.1.1.1", "test.com"], ["test.com", "www"], ["1.1.1.1", "test.com", "www"], ["1.1.1.2", "test.com", "www"]]
Output: [null, null, true, false]
```

Example 1 registers test.com at 1.1.1.1, then adds www to test.com's subdomain set.
The query for that exact IP, domain, and subdomain passes both membership checks and returns true.
The next query uses 1.1.1.2, whose domain set does not contain test.com.
It returns false even though the domain's www subdomain exists elsewhere.
Registration methods contribute null results in the operation transcript.

## Complexity

With ordinary hash behavior, each registration and query uses expected O(1) table operations.
String hashing and equality also depend on the input text lengths.
Storage is proportional to registered IP-domain and domain-subdomain relationships.

## Edge cases

Queries for unknown IPs or domains return false.
Repeated subdomain registration is idempotent because sets discard duplicates.
Several domains can share one IP.

## Common mistakes

Checking only the subdomain map ignores host ownership.
Do not treat all occurrences of a subdomain label as one global registration.

## Language notes

Python uses `setdefault` and `get` with defaults.
Java uses `computeIfAbsent`, `getOrDefault`, and camelCase method names as required by the harness.
