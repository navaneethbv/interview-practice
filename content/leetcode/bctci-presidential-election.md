# Presidential Election

Each party has a unique candidate name and a positive vote count.
A party wins as soon as it holds strictly more than half of all votes.
Otherwise, sort the current parties by votes and merge every party whose votes are at most the second entry's vote count.
Thus all ties at the cutoff participate, including ties for the smallest count.
The new party keeps their combined votes and the candidate from the participating party with the largest pre-merge vote count; break candidate ties lexicographically.
Repeat and return the winning candidate.

## Constraints

- 1 <= candidates.length = votes.length <= 1,000.
- 1 <= votes[i] <= 1,000,000.
- Candidate names contain 1 to 20 English letters; comparison is case-sensitive.


## Examples

### Example 1

```text
Input: [["Ada", "Ben", "Cy"], [2, 3, 4]]
Output: "Ben"
```

### Example 2

```text
Input: [["Ada", "Ben"], [4, 4]]
Output: "Ada"
```
