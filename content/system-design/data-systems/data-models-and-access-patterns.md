The data model should make the important queries understandable.
Relational models are useful when constraints, joins, and transactions express the business rules directly.
Document models can keep an aggregate close to its common read path, but duplicated data requires an explicit update strategy.
Graph models are useful when the relationships themselves are the main object of exploration.

## Choose around queries

List the queries the product must serve and estimate their frequency.
An index is valuable when it turns a frequent scan into a bounded lookup, but every index adds write work and storage.
Avoid designing a schema around an imagined future query that has no product requirement.

## Encoding and evolution

Data outlives the code that first wrote it.
Prefer formats and migrations that let old and new readers coexist during a rollout.
Adding an optional field is usually easier to roll out than changing the meaning of an existing field.
Treat event schemas and API payloads as contracts with compatibility rules, not incidental implementation details.
