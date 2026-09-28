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
