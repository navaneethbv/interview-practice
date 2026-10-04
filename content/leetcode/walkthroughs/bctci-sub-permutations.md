## Intuition

A substring rearranges all letters of s1 exactly when its length and frequency vector match s1.
Slide a fixed-width window across s2 to find matching occurrences.
Store the actual matching strings in a set because the requested count is of distinct arrangements, not positions.

## Brute force

Generate every permutation of s1 and search for each in s2.
The number of permutations can be factorial, and repeated letters introduce many duplicate generated arrangements.

## Approach

Count s1 into a 26-entry `need` array and maintain a matching-size `window` frequency array.
As each source character arrives, increment its count.
Once the window would exceed `width`, decrement the character that is leaving.
For a complete window, compare all 26 counts with need.
On equality, extract that window's substring and insert it into `found`.
Finally return the set size.
Frequency equality guarantees the substring is a permutation, while string-set equality ensures repeated occurrences of the same ordering count only once.

## Walkthrough

Example 1 has s1 equal to `ab` and s2 equal to `ababba`.
Its two-character windows are `ab`, `ba`, `ab`, `bb`, and `ba`.
Every window except `bb` has one a and one b.
The matching strings inserted into found are therefore only `ab` and `ba`, despite four matching positions.
The answer is 2.

## Complexity

Let n be source length, m target length, and h the number of matching occurrences.
Frequency maintenance and comparisons cost O(n) for the fixed alphabet, but copying and hashing matching substrings costs O(h times m).
Worst-case time is O(n times m).
If d distinct strings match, stored substring space is O(d times m), plus O(m) temporary allocation and fixed counters.

## Edge cases

For s1 equal to one repeated letter, many positions may still produce only one distinct string.
Repeated letters in s1 require their full multiplicity in every matching window.

## Common mistakes

Counting successful windows directly overcounts repeated arrangements.
Do not describe the displayed implementation as strictly O(n) when substring copying and hashing depend on m.

## Language notes

Python compares lists and stores sliced strings.
Java uses `Arrays.equals` and `HashSet<String>`, with newly created substrings for candidate insertions.
