## Intuition

Original indices must remain stable even after deletions.
Keep deletion flags instead of physically removing elements, and separately order indices by value so that minimum deletions can find the next surviving candidate.

## Brute force

Physically removing array elements shifts indices and requires additional original position bookkeeping.
Scanning all survivors for every minimum deletion takes O(nq) time for n elements and q operations.

## Approach

Build `deleted` and sort `order` by `(nums[index], index)`.
A nonnegative operation marks its original position.
For -1, advance `pointer` past deleted candidates and mark the first live one.
Finally scan original positions to collect remaining values.

## Walkthrough

Example 1 orders indices as 3, 1, 0, 2, 4, corresponding to values 20, 30, 50, 70, 80.
Operation 2 deletes 70.
The first minimum deletion removes 20; operation 4 removes 80.
The next minimum deletion removes 30, leaving `[50]`.

## Complexity

Sorting costs O(n log n).
The pointer advances at most n positions across all operations, so remaining work is O(n + q).
The flags, ordering, and returned elements occupy O(n) total space.

## Edge cases

Repeated direct deletion of one index is harmless.
Equal minimum values are removed by smaller original index first.
With no operations, all values are returned unchanged in order.
The pointer can safely reach the end.

## Common mistakes

Do not interpret an operation as an index in a shortened array.
Do not output survivors in value order.
After a minimum deletion, the pointer may stay where it is because the next minimum operation skips its now deleted entry.

## Language notes

Python expresses the complete tie break through a tuple sort key.
Java compares values and then indices explicitly.
Both references avoid changing `nums` and keep sorting confined to a separate collection of original positions.
