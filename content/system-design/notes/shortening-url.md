## Encoding actual URL

Use MD5 algorithm as hash function ⇒ produce a 128-bit hash value.

## Cache

__Which cache eviction policy would best fit our needs?__

When the cache is full, and we want to replace a link with a newer/hotter URL, how would we choose? . Under this policy, we discard the least recently used URL first. We can use a Linked Hash Map or a similar data structure to store our URLs and Hashes, which will also keep track of the URLs that have been accessed recently.

To further increase the efficiency, we can replicate our caching servers to distribute the load between them.

## Load Balancer (LB)

We can add a Load balancing layer at three places in our system:

- Between Clients and Application servers
- Between Application Servers and database servers
- Between Application Servers and Cache servers
