## Intuition

The correct order of two numeric strings is determined by which concatenation is larger.
Place `first` before `second` exactly when `first + second` is greater than `second + first`.
Sorting with that comparator globally maximizes the concatenated result.

## Brute force

Trying every permutation of n numbers and building each candidate string takes O(n! × nL) time, where L is the maximum number-string length.
Retaining only the best candidate limits temporary string storage to O(nL).
Sorting by ordinary numeric or lexicographic value is not sufficient because concatenation changes the comparison, as 2 and 10 demonstrate.

## Approach

1. Convert every number to a string.
2. Sort with `compare`, preferring the order that produces the larger pairwise concatenation.
3. Join the sorted strings.
4. Strip leading zeroes from the joined result, returning one zero when every input was zero.

## Walkthrough

Example 1 has `nums = [10, 2]`.

| pair order | concatenation | comparison |
| --- | --- | --- |
| `10, 2` | `102` | smaller |
| `2, 10` | `210` | larger |

The comparator places `2` before `10`, and joining gives `"210"`.

## Complexity

- Time: O(n log n * L), where L is the maximum number-string length, because sorting performs string concatenation comparisons.
- Space: O(nL), for converted strings and the joined output, with comparator temporaries proportional to L.

## Edge cases

All-zero inputs must return one zero rather than a string of repeated zeroes.
Numbers with shared prefixes can still differ under concatenation order.
The method handles values whose combined output is larger than a machine integer.
Duplicate values remain valid and are interchangeable under the comparator.

## Common mistakes

- Sorting numerically puts 10 before 2 and produces the wrong result.
- Comparing only the first character misses repeated-prefix cases such as 12 and 121.
- Returning the raw join for `[0,0]` violates the single-zero output rule.

## Language notes

Python uses `cmp_to_key` to adapt the pairwise comparator to sorting.
Java uses a comparator over `String` values and joins after sorting.
Both languages avoid numeric conversion of the final concatenation, preventing overflow.
