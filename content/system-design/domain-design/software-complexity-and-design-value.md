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
