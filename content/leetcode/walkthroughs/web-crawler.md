## Intuition

The parser exposes a directed graph of URLs.
Breadth-first traversal visits every reachable URL, while a hostname check excludes external hosts and a set prevents cycles and duplicate links.

## Brute force

Repeatedly scanning all known URLs for outgoing links can revisit pages many times.
A queue processes each accepted URL once.

## Approach

1. Extract the exact hostname from startUrl.
2. Add startUrl to `seen` and the pending queue.
3. Parse each queued URL, accepting links whose hostname matches and that are newly seen.
4. Return the collected URLs in any order.

## Walkthrough

For Example 1, startUrl is `http://a.test/start`.
Its links include `http://a.test/next` and `http://b.test/`; only the first matches the hostname and is enqueued.
The cycle back to start is already seen, so the result contains the two a.test URLs.

## Complexity

For V reachable URLs and E returned links, traversal and hostname checks cost O(V+E+T), where T is the total URL character count parsed.
The seen set, queue, and returned list use O(V) URL references, with parser and URL temporary storage proportional to the processed characters.
Python's `urlsplit` and list queue use these structures; Java uses `URI` parsing, `HashSet`, and `ArrayDeque`.
The parser itself may have its own cost and is not duplicated by the algorithm.

## Edge cases

The start URL is included even with no outgoing links.
A repeated link is enqueued once.
Hostname matching rejects deceptive prefixes such as `a.test.evil` and subdomains such as `sub.a.test`.

## Common mistakes

Compare parsed hostnames rather than URL prefixes.
Mark a URL seen before enqueueing it.
Follow directed links only.

## Language notes

The Java reference is intentionally sequential because the contract requires reachability, not parallel requests.
The local parser fixture performs no network access.
