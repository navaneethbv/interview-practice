# Design a Food Rating System

Food `foods[i]` belongs to cuisine `cuisines[i]` and has rating `ratings[i]`.
`changeRating(food, newRating)` updates a food's rating.
`highestRated(cuisine)` returns the highest-rated food of that cuisine, choosing the lexicographically smallest name on a tie.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Food names are unique.
- Every queried cuisine has at least one food.
- Ratings are between 1 and 10^8.

## Examples

### Example 1

```text
Input: ctor = [["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ops = ["highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"], args = [["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output: ["kimchi", "ramen", null, "sushi", null, "ramen"]
Explanation: After both changes, ramen and sushi tie at 16 and ramen is lexicographically smaller.
```

### Example 2

```text
Input: ctor = [["a"], ["x"], [1]], ops = ["changeRating", "highestRated"], args = [["a", 5], ["x"]]
Output: [null, "a"]
Explanation: A single food is always the answer.
```
