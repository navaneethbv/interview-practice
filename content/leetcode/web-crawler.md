# Crawl Pages on One Host

Starting at `startUrl`, return every reachable URL with the same hostname as the starting URL.
Use `htmlParser.getUrls(url)` to obtain the outgoing links from a page.
Include startUrl, follow directed links, and return each qualifying URL once in any order.
Hostname matching uses the exact host name, not a textual URL prefix.
The local parser fixture supplies a list of URLs and directed edges as pairs of zero-based URL indices.
It performs no network access.

## Examples

```text
Input: startUrl = "http://a.test/start", htmlParser = {"urls":["http://a.test/start","http://a.test/next","http://b.test/"],"edges":[[0,1],[1,0],[0,2]]}
Output: ["http://a.test/start","http://a.test/next"]
Explanation: The cycle adds no duplicates and the different hostname is excluded.
```

```text
Input: startUrl = "http://a.test/", htmlParser = {"urls":["http://a.test/"],"edges":[]}
Output: ["http://a.test/"]
Explanation: The starting page is included even when it has no links.
```

## Constraints

- The fixture contains between 1 and 1000 distinct URLs.
- URLs use HTTP and have no port numbers.
- startUrl is present in the fixture.
- Edges may form cycles; getUrls may return duplicate links.
- Results may be returned in any order.
