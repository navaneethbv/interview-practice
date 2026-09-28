Large media should usually upload directly to object storage through scoped, expiring credentials.
Metadata, ownership, processing state, and access policy belong in a durable store.
Transcoding, thumbnails, virus scanning, indexing, and notifications should be asynchronous and observable.

For a drive-like product, define conflict handling, version history, sharing, deletion, and offline edits before selecting a synchronization protocol.
The last write is not always the correct winner when multiple devices can edit the same document.
