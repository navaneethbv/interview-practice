## Intuition

For a run of nonzero values, a suffix product is the current prefix product divided by the prefix product just before that suffix.
A zero breaks this rule because division by zero is invalid.
Resetting the prefix history after each zero makes every stored prefix safe to divide.

## Brute force

Store the complete stream and multiply the last k values for every query.
That takes O(k) time per query and repeatedly multiplies the same values.
Prefix products replace the repeated work with one division, while a reset handles any query crossing a zero.

## Approach

1. Start `prefix` with the multiplicative identity one.
2. For a nonzero add, append the previous prefix multiplied by num.
3. For a zero add, replace the history with a fresh `[1]`.
4. If k is at least the history length, return zero because the requested suffix includes a reset boundary.
5. Otherwise divide the newest prefix by the prefix k positions earlier.

The sentinel represents the product of zero values.
It makes a query covering the entire current nonzero run divide by one.

## Walkthrough

Example 1 adds three, zero, and two, then queries suffix lengths one and three.

| Operation | prefix | Result |
| --- | --- | --- |
| initial | [1] | none |
| add(3) | [1,3] | null |
| add(0) | [1] | null |
| add(2) | [1,2] | null |
| getProduct(1) | [1,2] | 2 / 1 = 2 |
| getProduct(3) | [1,2] | 0 |

The length-three query reaches beyond the one stored nonzero value, so it necessarily includes the earlier zero.

## Complexity

Queries take O(1) time.
Adds are amortized O(1) over the stream, including dynamic-array growth and disposing of histories at resets.
In Python, releasing a discarded history can make an individual zero add O(r) for a run of r values.
Live history space is O(r + 1), excluding unreachable storage awaiting reclamation.

## Edge cases

Consecutive zeros repeatedly restore the sentinel.
A query ending in zero returns zero for every valid positive k.
A run of ones keeps prefix values equal but still records its length correctly.
Queries are guaranteed not to exceed the complete stream length.

## Common mistakes

- Including zero in a normal prefix history makes later division impossible.
- Using greater-than instead of greater-than-or-equal for the boundary misses a zero-crossing suffix.
- Omitting the sentinel complicates full-run queries and causes indexing errors.

## Language notes

Python uses exact integer division with `//`; Java's integer division is exact for these prefix ratios.
The contract guarantees every contiguous segment product fits signed 32-bit storage, so Java multiplication is safe.
Java replaces the list at a reset and leaves disposal of the old storage to garbage collection.
