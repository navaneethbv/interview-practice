Storage failures can appear as application errors, latency spikes, corrupted files, or a full filesystem.
Monitor capacity, inode usage, I/O latency, error counters, and the health of the device or remote mount.

## Durable data

A backup is useful only if it can be restored and the restored data is complete enough for the recovery objective.
Keep copies in a separate failure domain, protect their credentials, and test restoration on a schedule.
Document retention and deletion rules so backup copies do not silently violate privacy requirements.

## Filesystem operations

Understand whether a path is local, network-mounted, temporary, or backed by a container volume before relying on its durability.
Atomic rename is useful for replacing a completed file, but it does not by itself guarantee that every layer has flushed data to durable media.
