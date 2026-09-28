# Software complexity and design value

These notes are an independently written study aid inspired by Code Simplicity and Domain-Driven Design.
They focus on practical design choices rather than reproducing either book.

## Complexity is a product cost

Every rule, dependency, exception, and hidden coupling increases the effort needed to change the system safely.
A design is valuable when it reduces the total cost of useful change, not merely when it contains fewer lines.
Measure complexity by the number of concepts a change must touch and the number of ways a change can break unrelated behavior.

## Make the common path obvious

Prefer names, boundaries, and control flow that let a reader predict behavior without reconstructing the entire application.
Keep policy close to the data and behavior it governs, while keeping infrastructure replaceable at the edges.
Do not create a generic abstraction until the repeated behavior and its stable variation are understood.

# Discover the domain language

A useful model starts with the people who understand the problem, not with the tables or frameworks already in place.
Use the words that domain experts use, then test whether those words mean the same thing in every part of the product.

## Model through examples

Concrete scenarios reveal rules that nouns alone hide.
Ask what happens when a request is accepted, rejected, retried, cancelled, or partially completed.
Write examples that include normal cases, boundary cases, and competing actions.

## Keep language consistent

If the same word means different things in two contexts, make the distinction visible instead of pretending there is one universal model.
Ambiguous language is often a symptom of an unclear boundary or a missing concept.

# Entities, values, and aggregates

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

# Services, modules, and layers

Not every operation belongs on an entity.
A domain service is useful when an important operation has a clear domain meaning but no natural single owner.
An application service can coordinate a use case without owning the business rule itself.

## Modules are communication boundaries

Put concepts that change together in the same module and separate concepts that evolve for different reasons.
The goal is not maximum fragmentation.
The goal is to make dependencies visible and keep a change from leaking through unrelated code.

## Keep infrastructure at the edge

Repositories, message buses, clocks, and external clients are mechanisms that support the model.
The domain should depend on stable capabilities rather than vendor-specific details.
This separation makes tests more meaningful and allows infrastructure choices to change without rewriting the model.

# Bounded contexts and integration

A bounded context is a boundary within which a model and its language are consistent.
Two teams may both use the word account while meaning different concepts, and that is acceptable when the boundary is explicit.

## Context maps

Describe how contexts interact instead of drawing only boxes and arrows.
One context may publish a stable language, another may conform to it, and a third may translate it through an anti-corruption layer.
Choose shared models carefully because a shared kernel reduces duplication but couples release decisions.

## Integration contracts

Use versioned APIs or events with clear ownership and compatibility rules.
Translate at the boundary when an external model does not match the internal model.
Do not let an integration payload silently become the domain model for every consumer.

# Events and long-running workflows

An event records something that has already happened and can notify other contexts without requiring a shared transaction.
Events are useful for decoupling, but they introduce ordering, duplication, replay, and schema-evolution concerns.

## Make workflows explicit

A workflow that spans multiple aggregates or contexts should record its state and define compensation for a failed step.
Do not pretend that a distributed sequence is atomic when the system cannot guarantee atomicity.
Use idempotency keys and correlation identifiers so retries can be recognized and investigated.

## Events are not logs by default

Decide whether an event is an integration notification, an audit record, or the source of truth for rebuilding state.
Each role requires different retention, privacy, and replay guarantees.

# Strategic design and the core domain

Not every part of a product deserves equal modeling effort.
Identify the capability that differentiates the product and invest the deepest modeling and feedback there.
Use simpler solutions for generic supporting capabilities when they do not create strategic risk.

## Improve the model continuously

When a new example exposes awkward code, treat it as evidence that the model needs refinement.
Refactoring toward deeper insight is not cosmetic cleanup if it makes an important rule more precise and easier to change.
Record significant boundary decisions so future contributors understand why the model is divided the way it is.
