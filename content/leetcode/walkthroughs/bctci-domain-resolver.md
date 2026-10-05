## Intuition

A successful lookup must satisfy two separate relationships: the domain belongs to the requested IP, and the requested subdomain belongs to that domain.
Keeping both relationships explicit prevents a globally known subdomain from being accepted under the wrong address.

## Brute force

Store every registration in lists and scan those lists on each query.
This can take linear time per lookup and repeat the same searches over a long sequence of operations.

## Approach

`domains_at` maps each IP to a set of registered domains.
`subdomains` maps each domain to a set of its registered subdomains.
Registering a domain adds it to the first map and ensures its subdomain set exists.
Registering a subdomain adds it to that domain's set.
A query checks both memberships and returns their conjunction.
The guarantee that each domain is registered at most once makes this separation consistent across IPs.

## Walkthrough

Example 1 first registers `test.com` at `1.1.1.1`, then adds `www` under that domain.
These two operations return null.
The query for `1.1.1.1`, `test.com`, and `www` passes both membership tests and returns true.
Changing only the queried IP to `1.1.1.2` fails the first test and returns false.
The operation results are `[null, null, true, false]`.

## Complexity

Each operation takes expected O(1) hash-table work, excluding the cost of hashing its strings.
Space is O(d + s) stored memberships for d domains and s distinct subdomain registrations, plus IP keys and string storage.

## Edge cases

Queries for unknown IPs or domains return false.
Repeated subdomain registration has no effect because membership is stored in a set.
Subdomains are registered only after their parent domain exists.

## Common mistakes

Do not check subdomain membership without validating the IP-to-domain relationship.
Do not treat identical subdomain text under different domains as one registration.

## Language notes

Python uses snake_case operation names and `setdefault` for initialization.
Java exposes camelCase names and uses `computeIfAbsent`; the operation adapter maps between those names.
