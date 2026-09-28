These notes are an independently written study aid inspired by Alex Xu’s System Design Interview guide.
They organize reusable interview habits and design primitives without reproducing the book.

## A dependable conversation loop

Start by clarifying the user actions, scale, freshness, retention, privacy, and success criteria.
State assumptions aloud and ask which one the interviewer wants to change if the prompt is intentionally open-ended.
Sketch a broad design, walk through a request, find bottlenecks, and deepen only the parts that matter.

## Keep the discussion interactive

Explain why a component exists before discussing its implementation.
Invite tradeoffs instead of presenting a single design as inevitable.
When a concern is raised, update the diagram and describe the new failure mode or cost.
