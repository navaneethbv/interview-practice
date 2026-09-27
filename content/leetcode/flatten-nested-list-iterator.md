# Flatten Nested List Iterator

Build an iterator that visits all integers in a nested list from left to right, descending into a sublist before continuing with later siblings.
The supplied `NestedInteger` interface offers `isInteger()`, `getInteger()`, and `getList()`.
`next()` returns the next integer, and `hasNext()` checks whether one remains without consuming it.
Empty nested lists contribute no values.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [[[1, 1], 2, [1, 1]]], ops = ["next", "next", "next", "next", "next", "hasNext"], args = [[], [], [], [], [], []]
Output: [1, 1, 2, 1, 1, false]
Explanation: Flattening yields 1, 1, 2, 1, 1 in left-to-right order.
```

### Example 2

```text
Input: ctor = [[[], [3, []], []]], ops = ["hasNext", "hasNext", "next", "hasNext"], args = [[], [], [], []]
Output: [true, true, 3, false]
Explanation: Empty lists contribute nothing, and repeated hasNext calls do not consume 3.
```

## Constraints

- There are at most 1000 integers and nested lists in the input.
- Integers are between -1000000 and 1000000.
- next is called only when a value remains.
- Nested depth is at most 500.
