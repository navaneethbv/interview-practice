# Web Crawler Multithreaded

Starting from startUrl, discover all reachable pages with the same hostname as the starting page.
The provided `htmlParser.getUrls(url)` returns that page's outgoing links.
Return each qualifying URL exactly once, in any order, and handle cycles and repeated links.
Do not traverse pages belonging to another hostname.

For the multithreading exercise, coordinate workers so a URL is claimed once before fetching it.
This site's parser is a deterministic in-memory fixture rather than a network client.
The judge checks reachable-page results; it does not measure parallel speedup or require a particular worker count.
The Python browser runtime does not support OS threads, so use sequential Python traversal or choose Java for a threaded implementation.
See the [Pyodide compatibility documentation](https://pyodide.org/en/stable/usage/wasm-constraints.html).
Tests encode the parser as a list of `urls` and directed `edges` containing pairs of URL indices.

## Examples

### Example 1

```text
Input: startUrl = "http://site.test/a", htmlParser = {"urls": ["http://site.test/a", "http://site.test/b", "http://other.test/c"], "edges": [[0, 1], [0, 2], [1, 0]]}
Output: ["http://site.test/a", "http://site.test/b"]
Explanation: The second host is excluded, and the cycle does not duplicate the start page.
```

### Example 2

```text
Input: startUrl = "http://solo.test", htmlParser = {"urls": ["http://solo.test"], "edges": []}
Output: ["http://solo.test"]
Explanation: The start page is included even without outgoing links.
```

## Constraints

- There are 1 to 1000 unique URLs.
- URLs use http:// with lowercase hostnames, no ports, and optional paths.
- The start URL appears in the fixture.
- getUrls is safe to call concurrently and performs no actual network request.
