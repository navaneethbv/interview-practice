## Intuition

For any proposed largest part sum, a greedy scan can determine the fewest contiguous parts needed.
If that minimum is at most k, the proposed limit is feasible because extra cuts can be made when allowed.
Feasibility becomes easier as the limit grows, which creates a binary search over the answer.

## Brute force

Trying every set of k minus one cut positions checks all possible partitions.
There can be exponentially many choices, and evaluating each partition can take O(n) time.
Dynamic programming improves that approach but uses a larger state table than the monotonic feasibility search.

## Approach

1. Set left to the largest element and right to the total sum.
2. Test the midpoint as a candidate largest part sum.
3. Greedily append values until the next value would exceed the candidate, then start a new part.
4. If the required part count is at most k, search a smaller limit.
5. Otherwise search larger limits.
6. Return the converged limit.

## Walkthrough

Example 1 uses nums = [7, 2, 5, 10, 8] and k = 2.

| bounds before test | candidate limit | greedy parts | decision |
| --- | ---: | --- | --- |
| [10,32] | 21 | [7,2,5], [10,8] | feasible, set right to 21 |
| [10,21] | 15 | [7,2,5], [10], [8] | three parts, set left to 16 |
| [16,21] | 18 | [7,2,5], [10,8] | feasible, set right to 18 |
| [16,18] | 17 | [7,2,5], [10], [8] | three parts, set left to 18 |

The smallest feasible limit is 18, using parts [7, 2, 5] and [10, 8].

## Complexity

Let n be nums length and T be sum(nums) minus max(nums) plus one possible limits.
Each binary search step scans nums, so time is O(n log T).
The helper uses O(1) auxiliary space beyond the input and scalar bounds.
All values are nonnegative under the statement contract, which makes the greedy part count valid.

## Edge cases

When k is one, the answer is the total sum.
When k equals nums length, the answer is the largest element.
Zero values can join a part without increasing its sum.
A single element returns that element.

## Common mistakes

- Allowing a part to exceed the candidate before cutting makes feasibility incorrect.
- Searching from zero ignores the lower bound imposed by the largest value.
- Updating the current part after starting a new one can lose the value that caused the cut.
- Treating k as an exact count during greedy counting can reject a feasible limit.

## Language notes

Python uses max and sum to initialize the numeric bounds and a helper for the scan.
Java computes both bounds in one loop and uses int arithmetic under the supplied limits.
Neither implementation copies nums.
