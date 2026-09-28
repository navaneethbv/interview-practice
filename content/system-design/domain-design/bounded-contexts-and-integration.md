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
