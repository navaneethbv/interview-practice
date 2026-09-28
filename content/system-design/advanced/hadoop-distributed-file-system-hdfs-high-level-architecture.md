## HDFS architecture

All files stored in HDFS are broken into multiple fixed-size blocks, where each block is 128 megabytes in size by default (configurable on a per-file basis). Each file stored in HDFS consists of two parts: the **actual file data** and the **metadata**, i.e., how many block parts the file has, their locations and the total file size, etc. HDFS cluster primarily consists of a **NameNode** that manages the file system metadata and **DataNodes** that store the actual data.

<figure><img src="/course-assets/system-design/advanced/e4108f26620862a2.webp" width="524" height="424" alt="HDFS high-level architecture" loading="lazy"><figcaption>HDFS high-level architecture</figcaption></figure>

- All blocks of a file are of the same size except the last one.
- HDFS uses **large block sizes** because it is designed to store extremely large files to enable MapReduce jobs to process them efficiently.
- Each block is identified by a unique 64-bit ID called **BlockID**.
- All read/write operations in HDFS operate at the block level.
- DataNodes store each block in a separate file on the local file system and provide read/write access.
- When a DataNode starts up, it scans through its local file system and sends the list of hosted data blocks (called BlockReport) to the NameNode.
- The NameNode maintains two on-disk data structures to store the file system’s state: an **FsImage** file and an **EditLog**. FsImage is a checkpoint of the file system metadata at some point in time, while the EditLog is a log of all of the file system metadata transactions since the image file was last created. These two files help NameNode to recover from failure.
- User applications interact with HDFS through its client. HDFS Client interacts with NameNode for metadata, but all data transfers happen directly between the client and DataNodes.
- To achieve high-availability, HDFS creates multiple copies of the data and distributes them on nodes throughout the cluster.

<figure><img src="/course-assets/system-design/advanced/26eb8c14d0c23cfd.webp" width="524" height="329" alt="HDFS block replication" loading="lazy"><figcaption>HDFS block replication</figcaption></figure>

## Comparison between GFS and HDFS

HDFS architecture is similar to GFS, although there are differences in the terminology. Here is the comparison between the two file systems:

<figure><img src="/course-assets/system-design/advanced/6d99f9a2f23cc6ba.webp" width="524" height="1091" alt="Diagram: High-level Architecture" loading="lazy"></figure>

<figure><img src="/course-assets/system-design/advanced/3c49ac180ece750b.webp" width="524" height="605" alt="Diagram: High-level Architecture" loading="lazy"></figure>
