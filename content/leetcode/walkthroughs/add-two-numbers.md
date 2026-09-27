## Intuition

The lists store digits in reverse order, so the head of each list is the units column.
Add the two available digits and `carry`, emit one result digit, and carry the remaining tens value into the next column.
A dummy head makes the first result node follow the same linking rule as every later node.

## Brute force

Reading both lists into arrays, adding aligned entries, and rebuilding a list takes O(m + n) time but also O(m + n) temporary storage.
Converting the lists to fixed-width integers can overflow, so processing the linked digits directly is safer.

## Approach

1. Create `dummy` and keep `tail` at the end of the result list.
2. While either input remains or `carry` is nonzero, add the current values that exist.
3. Create a node containing `carry % 10`, advance `tail`, and set `carry` to integer division by 10.
4. Return `dummy.next`.

## Walkthrough

Example 1 adds `[2, 4, 3]` and `[5, 6, 4]`.

| columns | sum including carry | emitted digit | next `carry` |
| --- | ---: | ---: | ---: |
| 2 + 5 | 7 | 7 | 0 |
| 4 + 6 | 10 | 0 | 1 |
| 3 + 4 + 1 | 8 | 8 | 0 |

The linked result is `[7, 0, 8]`, representing 807.

## Complexity

- Time: O(max(m, n)), because each list node is consumed once, where m and n are the input lengths.
- Space: O(max(m, n)), for the returned list, with O(1) auxiliary state beyond that output.

## Edge cases

Unequal list lengths contribute zero for the missing side.
An empty list is handled by the other list and the carry.
A final carry creates a new most significant node.
The method supports long numbers without converting them to a machine integer.

## Common mistakes

- Returning `dummy` includes the sentinel zero in the result.
- Forgetting the final carry drops a digit from sums such as 9 plus 1.
- Advancing a non-null input before reading its value skips a column.

## Language notes

Python constructs `ListNode` objects using the helper exposed by the judge.
Java uses the harness-provided `ListNode` whose digit field is `val`.
Both methods mutate no input links and build a fresh result chain.
