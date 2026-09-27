# Robot Bounded In Circle

A robot starts at the origin facing north.
G moves one step forward, L turns left, and R turns right.
It repeats the entire instruction string forever.
Return whether its path remains within some finite distance of the origin.

## Constraints

- There are 1 to 100 instructions, each G, L, or R.

## Examples

### Example 1

```text
Input: instructions = "GL"
Output: true
Explanation: Repeated runs trace a square.
```

### Example 2

```text
Input: instructions = "GG"
Output: false
Explanation: The robot keeps moving north.
```
