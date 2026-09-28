A safe data change has a compatibility story, an observable rollout, and a recovery path.
Expand a schema before switching writers, backfill in bounded batches, verify counts and invariants, then remove obsolete paths only after the new path has been stable.

Prefer explicit ownership of data and derived views.
Document retention, deletion, access control, and recovery expectations beside the design so operational behavior is part of correctness.
