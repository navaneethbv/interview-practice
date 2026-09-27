# Find Median from Data Stream

Implement `MedianFinder` with an empty constructor.
`addNum(num)` appends an integer to the stream, and `findMedian()` returns its current median.
For an odd number of values, use the middle sorted value; for an even number, average the two middle values.
Each query occurs after at least one insertion.
Void operations display `null`.

## Constraints

- `-100000 <= num <= 100000`.
- There are at most 50000 operations.
- Answers within `0.00001` of the correct median are accepted.

## Examples

### Example 1

```text
Input: ops = ["addNum", "findMedian", "addNum", "findMedian"], args = [[4], [], [9], []]
Output: [null, 4.0, null, 6.5]
Explanation: An even-sized stream averages its two middle values.
```

### Example 2

```text
Input: ops = ["addNum", "addNum", "addNum", "findMedian"], args = [[-3], [2], [1], []]
Output: [null, null, null, 1.0]
Explanation: The sorted stream is -3, 1, 2.
```
