## Service initialization

Upon initialization, Chubby performs the following steps:

- A master is chosen among Chubby replicas using Paxos.
- Current master information is persisted in storage, and all replicas become aware of the master.

## Client initialization

Upon initialization, a Chubby client performs the following steps:

- Client contacts the DNS to know the listed Chubby replicas.
- Client calls any Chubby server directly via Remote Procedure Call (RPC).
- If that replica is not the master, it will return the address of the current master.
- Once the master is located, the client maintains a session with it and sends all requests to it until it indicates that it is not the master anymore or stops responding.

<figure><img src="/course-assets/system-design/advanced/993d38f3a8ff94eb.webp" width="524" height="314" alt="Chubby high-level architecture" loading="lazy"><figcaption>Chubby high-level architecture</figcaption></figure>

## Leader election example using Chubby

Let’s take an example of an application that uses Chubby to elect a single master from a bunch of instances of the same application.

Once the master election starts, all candidates attempt to acquire a Chubby lock on a file associated with the election. Whoever acquires the lock first becomes the master. The master writes its identity on the file, so that other processes know who the current master is.

<figure><img src="/course-assets/system-design/advanced/ed8ade46319a80e8.webp" width="524" height="244" alt="Diagram: How Chubby Works" loading="lazy"></figure>

### Sample pseudocode for leader election

The pseudocode below shows how easy it is to add leader election logic to existing applications with just a few additional code lines.

<figure><img src="/course-assets/system-design/advanced/2a0ee78f55df82f6.webp" width="524" height="513" alt="Diagram: How Chubby Works" loading="lazy"></figure>
