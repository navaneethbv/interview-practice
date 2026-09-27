## Intuition

The closest palindrome must be formed by mirroring a prefix that is near the prefix of `n`, except for boundary palindromes with one fewer or one more digit.
Testing prefix minus one, the original prefix, and prefix plus one covers the nearest changes on either side.

## Brute force

Checking every integer below and above `n` until finding palindromes can scan an enormous gap for an 18-digit input.
Constructing a small candidate set avoids that numeric search.

## Approach

1. Parse the value and take the first half, including the middle digit for odd lengths, as `prefix`.
2. Add `10^(length - 1) - 1` and `10^length + 1` for digit-count boundaries.
3. Mirror `prefix - 1`, `prefix`, and `prefix + 1` into full palindromes.
4. Remove `n` itself, then choose the candidate with minimum distance and smallest numeric value on ties.

## Walkthrough

For Example 1, `n = "123"`, so `prefix = 12`.
Mirroring prefix 11 gives 111, prefix 12 gives 121, and prefix 13 gives 131.
The boundary candidates are 99 and 1001.
After excluding 123, 121 is two away and is closer than the others, so the result is `"121"`.

## Complexity

Only a constant number of candidates are constructed, and each has at most `L` digits, so time is `O(L)`.
The candidate set and temporary strings use `O(L)` space, where `L` is the length of `n`.

## Edge cases

For `n = "1"`, the lower boundary candidate is zero and wins the tie against 2.
The boundary candidates handle powers of ten and values whose nearest palindrome has fewer or more digits.

## Common mistakes

- Forgetting to exclude `n` can return the input itself.
- Breaking ties by larger value violates the smaller-candidate rule.
- Mirroring the wrong number of prefix digits creates an incorrectly sized palindrome.

## Language notes

Python integers and Java `long` both safely represent the stated maximum 18-digit input.
Java builds the mirrored string with `StringBuilder`, and its `powerOfTen` helper avoids floating-point rounding.
