# Minimum Index Sum of Two Lists

Find common strings whose index in list1 plus index in list2 is as small as possible.
Return all strings attaining that minimum, in any order.

## Examples

### Example 1

```text
Input: list1 = ["a", "b", "c"], list2 = ["c", "b", "a"]
Output: ["a", "b", "c"]
Explanation: All three shared strings have index sum 2.
```

### Example 2

```text
Input: list1 = ["alpha", "beta"], list2 = ["beta", "gamma"]
Output: ["beta"]
Explanation: Only beta occurs in both lists.
```

## Constraints

- 1 <= list1.length, list2.length <= 1,000
- Strings are nonempty and unique within each list.
- At least one string occurs in both lists.
