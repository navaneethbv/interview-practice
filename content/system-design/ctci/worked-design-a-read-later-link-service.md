Consider a service where a user submits a web address and receives a private saved-link entry that can be opened later.
The exercise is intentionally scoped to saving, listing, opening, and deleting links for one account.

## Baseline design

The API authenticates the account, validates the address, and writes a link record containing the owner, an opaque identifier, the normalized address, timestamps, and an optional title.
A relational store is a reasonable starting point because ownership and deletion rules are important.
The list endpoint reads records by owner and creation time with a cursor rather than an offset.
The open endpoint checks ownership before returning the saved address.

## Growth points

The list path can use a cache for accounts that open the same collection frequently, but updates must invalidate or version the cached page.
Title extraction and preview generation should run asynchronously so a slow remote site does not hold the save request open.
The preview worker needs timeouts, size limits, an allowlist policy for outbound requests, and a retry limit.
If the service grows across regions, route reads near the user while keeping ownership changes on an authoritative write path.

## Follow-up questions

Ask whether links are private, shareable, or searchable.
Ask how quickly deletes must remove previews and cached content.
Ask whether the system needs import and export, abuse reporting, retention limits, or audit history.
Each answer changes the data model, authorization checks, asynchronous work, or consistency promise.
