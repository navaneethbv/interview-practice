# Analyze User Website Visit Pattern

A visit record consists of a username, a timestamp, and a website from the same index of the three arrays.
A three-website pattern is an ordered sequence that one user visits at strictly increasing times, not necessarily consecutively.
Score a pattern by the number of distinct users who followed it at least once.
Return the highest-scoring pattern, breaking ties lexicographically.

## Examples

### Example 1

```text
Input: username = ["u", "u", "u", "v", "v", "v"], timestamp = [1, 2, 3, 4, 5, 6], website = ["a", "b", "c", "a", "b", "c"]
Output: ["a", "b", "c"]
Explanation: Two users followed a, b, c.
```

### Example 2

```text
Input: username = ["u", "u", "u", "u"], timestamp = [1, 2, 3, 4], website = ["b", "a", "c", "d"]
Output: ["a", "c", "d"]
Explanation: Every pattern scores one, so choose the lexicographically smallest.
```

## Constraints

- 3 <= number of records <= 50.
- Usernames and website names contain lowercase English letters.
- Timestamps are positive integers and visit times for one user are distinct.
- At least one user has three visits.
