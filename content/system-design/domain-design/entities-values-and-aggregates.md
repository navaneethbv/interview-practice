An entity is identified by continuity of identity, while a value object is defined by its attributes and can usually be replaced as a whole.
Use identity only where the business needs to track the same thing across changes.
Use values for concepts such as amounts, ranges, addresses, or measurements when equality of meaning matters more than object identity.

## Aggregate boundaries

An aggregate is a consistency boundary with one entry point for changes.
Keep invariants that must change together inside that boundary.
Reference other aggregates by identity and coordinate across them with events or explicit workflows.
Large aggregates create contention and make transactions expensive, while tiny aggregates can scatter rules across unreliable sequences.

## Protect invariants

State the rule in business language before deciding where to enforce it.
The boundary should reject invalid transitions and expose operations that express the allowed change.
Persistence should support that boundary instead of becoming the place where callers assemble invalid states.
