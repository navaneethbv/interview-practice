# Queue Reconstruction by Height

Each record [h,k] describes a person of height h who has exactly k people of height at least h ahead of them.
The input records are shuffled.
Return a queue containing every record and satisfying every person's count.

## Examples

```text
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
Explanation: Every k count matches the taller or equally tall people before that record.
```

```text
Input: people = [[3,0]]
Output: [[3,0]]
Explanation: A single person has nobody ahead.
```

## Constraints

- 1 <= people.length <= 2000
- 0 <= h <= 1,000,000
- 0 <= k < people.length
- The input describes a valid queue.
