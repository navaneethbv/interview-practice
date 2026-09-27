# Number of Visible People in a Queue

People stand in the listed order, looking right.
Person i can see person j > i when every person between them is shorter than both endpoints.
Return how many people each person can see.

## Examples

### Example 1

```text
Input: heights = [10, 6, 8, 5, 11, 9]
Output: [3, 1, 2, 1, 1, 0]
Explanation: The first person sees heights 6, 8, and 11.
```

### Example 2

```text
Input: heights = [5, 1, 2, 3, 10]
Output: [4, 1, 1, 1, 0]
Explanation: The first person can see every later person.
```

## Constraints

- 1 <= heights.length <= 100,000
- 1 <= heights[i] <= 100,000
- All heights are distinct.
