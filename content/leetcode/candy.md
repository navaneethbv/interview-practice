# Candy

Assign candy to children standing in a line.
Every child needs at least one candy, and a child with a higher rating than an immediate neighbor must receive more candy than that neighbor.
Return the smallest possible total number of candies.

## Examples

### Example 1

```text
Input: ratings = [1, 3, 2]
Output: 4
Explanation: Assign 1, 2, and 1 candies.
```

### Example 2

```text
Input: ratings = [2, 2, 2]
Output: 3
Explanation: Equal ratings impose no extra requirement.
```

## Constraints

- 1 <= ratings.length <= 20000.
- 0 <= ratings[i] <= 20000.
