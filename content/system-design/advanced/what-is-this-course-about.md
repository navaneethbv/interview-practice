One common challenge senior engineers face is the lack of experience in designing scalable systems. The reason because it is not easy to get an opportunity to work on a large project, especially from the ground up. Most of the time, software engineers get to work on a small part of a bigger system. For these reasons, most engineers feel less prepared for system design interviews, as they lack the adequate knowledge required for designing large systems. This course is created to **help developers learn key system design skills** that will help them in interviews and in their professional careers.

One way to improve software designing skills is to understand the architecture of famous systems. This is equivalent to **learning from others** who have worked on designing large systems. In our experience, if a developer has a good understanding of the architecture of a complex system, it becomes pretty easy for them to gain knowledge from other systems even in a different domain. This is true because most system design techniques can easily be adapted and applied to other distributed systems.

<figure><img src="/course-assets/system-design/advanced/c8098f662c761b12.webp" width="524" height="177" alt="Diagram: What Is This Course About?" loading="lazy"></figure>

One way to learn system design is to **read the technical papers of famous systems**. Unfortunately, reading a paper is generally believed hard, and keeping the system design interview in mind, we are not interested in a lot of details mentioned in the papers. This course extracts out the most relevant details about the system architecture that the creators had in mind while designing the system. Keeping system design interviews in mind, we will focus on the various tradeoffs that the original developers had considered and what prompted them to choose a certain design given their constraints.

Furthermore, systems grow over time; thus, original designs are revised, adapted, and enhanced to cater to emerging requirements. This means reading original papers is not enough. This course will cover **criticism on the original design** and the architectural changes that followed to overcome design limitations and satisfy growing needs.

## What to expect

The course has two parts: **System Design Case Studies** and **System Design Patterns**.

### Part 1: System design case studies

In the first part, we will go through the architecture of a carefully chosen set of distributed systems:

1. Key-value store: **Dynamo**
2. No-SQL wide column stores: **Cassandra** and **BigTable**
3. Distributed messaging and streaming system: **Kafka**
4. Distributed file storage systems: **GFS** and **HDFS**
5. Distributed coordination and locking service: **Chubby** (*similar to Zookeeper*)

### Part 2: System design patterns

In the second part of this course, we will describe a set of design problems (*and their solutions*) that are common to distributed systems. We call these techniques ‘**System Design Patterns**,’ as they can be applied to all kinds of distributed systems and are very handy, especially in a system design interview. A few examples of such patterns are:

- **Write-ahead logging**
- **Bloom filters**
- **Heartbeat**
- **Quorum**
- **Checksum**
- **Lease**
- **Split Brain**

*Happy learning!*
