## The path of a web request

1. **DNS:** the resolver finds the IP address for the host name, using caches with TTLs.
2. **TCP handshake:** SYN, SYN-ACK, ACK establishes a connection (one round trip).
3. **TLS handshake:** TLS 1.3 negotiates keys in one round trip, or zero with resumption.
4. **HTTP request and response** over the encrypted connection.
5. Connection reuse (keep-alive, HTTP/2 multiplexing) amortizes the setup cost over many requests.

## TCP versus UDP

TCP provides reliable, ordered byte streams with flow control and congestion control.
UDP sends independent datagrams with no delivery guarantee; applications that need low latency and can tolerate loss (games, voice) or that implement their own reliability (QUIC) use it.
HTTP/3 runs over QUIC, which is built on UDP and avoids TCP's head-of-line blocking across streams.

## HTTP

- Methods: GET and HEAD are safe; GET, PUT and DELETE are idempotent; POST is neither.
- Status classes: 2xx success, 3xx redirection, 4xx client error, 5xx server error. Know 200, 201, 204, 301, 304, 400, 401, 403, 404, 409, 429, 500, 502, 503 and 504.
- Caching: `Cache-Control`, `ETag` with `If-None-Match`, and CDNs at the edge.
- HTTP/2 multiplexes many streams over one TCP connection; HTTP/3 does the same over QUIC.

## Load balancing layers

Layer 4 balancers route by IP and port and are fast; layer 7 balancers understand HTTP and can route by path, header or cookie, terminate TLS and retry.

## Questions to answer aloud

- What happens when you type a URL into a browser and press Enter?
- Why does a TCP connection take longer to reach full speed on a long-distance link?
- When would you choose WebSockets over server-sent events, and over long polling?
