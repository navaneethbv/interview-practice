# Nested List Weight Sum

Each element of `nestedList` is either an integer or another nested list.
Return the sum of every integer multiplied by its depth.
Integers directly inside the outer list have depth 1.
The provided `NestedInteger` interface exposes `isInteger()`, `getInteger()`, and `getList()`.
Test inputs use ordinary nested JSON arrays; your method receives interface objects.

## Examples

```text
Input: nestedList = [[1,1],2,[1,1]]
Output: 10
Explanation: Four ones have depth 2, while the two has depth 1.
```

```text
Input: nestedList = [1,[4,[6]]]
Output: 27
Explanation: The total is 1*1 + 4*2 + 6*3.
```

## Constraints

- At most 1000 integers appear across the nested structure.
- Nesting depth is at most 50.
- Integer values are between -100 and 100.
- Lists may be empty.
