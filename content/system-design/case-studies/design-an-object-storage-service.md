## Requirements

- Store and retrieve immutable objects from bytes to terabytes by bucket and key.
- Eleven nines of durability, high availability, list by prefix, and versioning.

## Architecture

```text
Clients -> API frontends (auth, routing)
        -> metadata service: bucket/key -> object id, size, checksums, version, placement (sharded KV store)
        -> data service: storage nodes holding chunks on disk
Background: repair, rebalancing, garbage collection, lifecycle rules
```

## Deep dives

**Durability.** Split each object into chunks and store them with erasure coding, for example 10 data plus 4 parity chunks across failure domains.
Any 10 of 14 reconstruct the data, using 1.4 times the raw size instead of 3 times for triple replication.
Checksums on every chunk detect corruption; background scrubbing verifies and repairs.

**Large uploads.** Multipart upload: the client uploads parts in parallel and retries individual parts; a final commit stitches them into one object atomically.

**Consistency.** Metadata writes go through a strongly consistent store so a successful PUT is immediately visible to GET and LIST.
Data chunks are written and acknowledged before the metadata commit, so metadata never points at missing data.

**Listing.** Keys are sorted in the metadata store, so prefix listing is a range scan.

## Follow-up questions

- How do you handle a hot object? (Cache at the frontend or CDN; objects are immutable so caching is safe.)
- How do deletes work with versioning? (A delete writes a tombstone version; garbage collection reclaims chunks no version references.)
