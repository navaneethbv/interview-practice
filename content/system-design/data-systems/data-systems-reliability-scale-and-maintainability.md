These notes are an independently written study aid inspired by Designing Data-Intensive Applications and Database Internals.
They summarize decision-making themes without reproducing either book.

## Three questions for every data system

Reliability asks whether the system continues to behave correctly when components fail.
Scalability asks how capacity changes as traffic, data, or users grow.
Maintainability asks whether people can operate, understand, and change the system without creating avoidable risk.

Treat these as separate dimensions.
A system can be fast but difficult to operate, highly available but logically incorrect, or easy to change but too expensive at peak load.

## Start from workload shape

Describe the reads, writes, payload sizes, retention, burstiness, and correctness boundaries before choosing storage.
A timeline feed, a payment ledger, a search index, and an event archive have different access patterns even when all of them store records.
Write down the hot path and the background path so the design does not accidentally make every operation synchronous.
