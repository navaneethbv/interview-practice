## Requirements

- Many users edit the same document at once and see each other's changes within a fraction of a second.
- Edits made offline merge when the user reconnects.
- Version history, comments and cursors of other users.

Assume 50 million documents, most with one editor at a time, and a few popular documents with hundreds of concurrent editors.

## The core problem

Two users insert text at the same position concurrently.
Applying operations in different orders on each client must still converge to the same document.
The two standard approaches:

- **Operational transformation (OT):** a central server orders operations and transforms each incoming operation against the operations it missed. Simple to reason about with a single authority per document.
- **CRDTs:** each character gets a unique, ordered identifier so operations commute without a central transform. Works peer-to-peer and offline, at the cost of metadata per character.

In an interview, pick one and explain convergence with an example; most hosted editors use a server-ordered approach.

## Architecture (server-ordered)

```text
Client <-> WebSocket gateway -> Document session (one owner per document, chosen by consistent hashing)
                                   -> operation log (append-only) -> snapshot every N operations
                                   -> broadcast transformed ops to all clients in the session
Presence (cursors) -> pub/sub, not persisted
```

## Deep dives

**Session ownership.** Route all connections for a document to one session process so operations get a single order.
If the owner fails, another instance loads the latest snapshot plus the operation log tail and resumes.

**Persistence.** Store the operation log durably before acknowledging, and snapshot periodically so loading a document does not replay its whole history.

**Offline edits.** The client keeps local operations with the last server revision it saw; on reconnect the server transforms them against everything newer.

## Follow-up questions

- How do you scale a document with 500 editors? (Batch operations, throttle presence updates, and keep one owner but shard broadcast across gateways.)
- How do you implement version history? (Named snapshots plus the operation log; restoring creates new operations rather than rewriting history.)
