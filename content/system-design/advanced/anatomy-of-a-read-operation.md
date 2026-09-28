A typical read interaction with a GFS cluster by a client application goes like this:

1. First, the client translates the file name and byte offset specified by the application into a chunk index within the file. Given the fixed chunk size, this can be computed easily.
2. The client then sends the master an RPC request containing the file name and chunk index.
3. The master replies with the chunk handle and the location of replicas holding the chunk. The client caches this metadata using the file name and chunk-index as the key. This information is subsequently used to access the data.
4. The client then sends a request to one of the replicas (the closest one). The request specifies the chunk handle and a byte range within that chunk.
   - Further reads of the same chunk require no more client-master interaction until the cached information expires or the file is reopened.
   - In fact, the client typically asks for multiple chunks in the same request, and the master can also include the information for chunks immediately following those requested.
5. The replica ChunkServer replies with the requested data.
6. As evident from the above workflow, the master is involved at the start and is then completely out of the loop, implementing a separation of control and data flows – a separation that is crucial for maintaining high performance of file accesses.

<figure><img src="/course-assets/system-design/advanced/7f2dbcb09d16b90b.webp" width="524" height="302" alt="The anatomy of a read operation" loading="lazy"><figcaption>The anatomy of a read operation</figcaption></figure>
