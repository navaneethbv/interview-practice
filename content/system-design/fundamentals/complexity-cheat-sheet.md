## Data structure operations

| Structure | Access | Search | Insert | Delete | Notes |
| --- | --- | --- | --- | --- | --- |
| Array / dynamic array | O(1) | O(n) | O(1) amortized at end, O(n) middle | O(n) | Cache-friendly |
| Linked list | O(n) | O(n) | O(1) with a node reference | O(1) with a node reference | |
| Hash table | | O(1) average | O(1) average | O(1) average | O(n) worst case |
| Balanced BST / tree map | O(log n) | O(log n) | O(log n) | O(log n) | Ordered iteration |
| Binary heap | O(1) min | O(n) | O(log n) | O(log n) pop | Build in O(n) |
| Trie | | O(L) | O(L) | O(L) | L = key length |
| Union-find | | ~O(1) amortized | | | With path compression and union by rank |

## Algorithms

| Algorithm | Time | Space |
| --- | --- | --- |
| Comparison sort (merge, heap, quick average) | O(n log n) | O(n), O(1), O(log n) |
| Counting / radix sort | O(n + k), O(d(n + k)) | O(n + k) |
| Binary search | O(log n) | O(1) |
| BFS / DFS | O(V + E) | O(V) |
| Dijkstra with a binary heap | O((V + E) log V) | O(V) |
| Topological sort | O(V + E) | O(V) |
| Floyd-Warshall | O(V^3) | O(V^2) |

## Reading constraints

| n up to | Typical target |
| --- | --- |
| 10 to 12 | O(n!) or O(2^n · n) |
| 20 to 25 | O(2^n) |
| 500 | O(n^3) |
| 5,000 | O(n^2) |
| 10^5 to 10^6 | O(n log n) or O(n) |
| 10^9 and more | O(log n) or O(1) |
