## Intuition

The identity of a word does not matter after computing its alphabetical sum.
Since a word contains at most three lowercase letters, each sum lies between 1 and 78.
This tiny domain allows checking pairs of sums instead of triples of original words.

## Brute force

Choose three words in three nested loops and multiply their sums.
Reusing a word is allowed, but enumerating all n cubed choices is still unnecessary.

## Approach

Calculate each word's sum using a equal to one through z equal to twenty-six, and insert the result into `sums`.
For each ordered pair `first` and `second` from that set, form their product.
If target is divisible by that product, calculate the required third sum as the exact quotient.
Return true if the quotient is also in `sums`.
Otherwise continue until every pair is checked, then return false.
Set deduplication is safe because the problem permits using the same word repeatedly; no frequency limit must be tracked.

## Walkthrough

Example 1 includes `abc`, whose sum is 6, and `nop`, whose sum is 45.
When both selected pair sums are 6, their product is 36.
The target 1620 is divisible by 36, and the required quotient is 45.
Because 45 is present, the method returns true, corresponding to `abc`, `abc`, and `nop`.
Only one occurrence of `abc` is needed in the input.

## Complexity

For n words and u distinct sums, expected runtime is O(n + u squared), since each word has at most three letters.
The set uses O(u) space, and u is at most 78.
Both bounds therefore remain small beyond the input scan.

## Edge cases

Empty input returns false because no pair is available.
Target one succeeds precisely when sum one is present and can be reused three times.

## Common mistakes

Check divisibility before looking up an integer quotient.
Do not require three distinct words or three copies of the same sum.

## Language notes

Python uses a set comprehension and character codes.
Java builds a `HashSet<Integer>`; pair products are at most 78 squared and fit safely in `int`.
