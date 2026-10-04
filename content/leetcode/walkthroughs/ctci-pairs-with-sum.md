## Intuition

A valid pair consumes one occurrence of each of its two values.
Frequencies tell us how many disjoint copies of a pair can be formed.
Processing only the smaller member of each complementary pair avoids returning the same pair in both orientations.

## Brute force

Search for an unused complement for every element, marking positions as consumed.
Repeated linear searches can take O(n squared) time and make duplicate accounting difficult.
A frequency table groups interchangeable occurrences together.

## Approach

Build `counts` and visit its keys in ascending order.
For each `value`, compute `complement = target - value`.
Skip when the complement is smaller, because that unordered value pair was already considered.
For unequal values, emit the minimum of their two counts.
For an equal-value pair, emit half its count rounded down.
Append that many `[value, complement]` pairs.
The complementary relationship is unique, so different processed value pairs never compete for the same occurrences.

## Walkthrough

Example 1 has counts 1:1, 3:3, 5:2, and 7:1, with target 8.
Value 1 pairs with 7 once.
Value 3 pairs with 5 twice because only two fives exist.
Values 5 and 7 are skipped as larger complementary members.
One 3 remains unused.
Return `[[1, 7], [3, 5], [3, 5]]`.

## Complexity

For n elements, u distinct values, and p returned pairs, Python takes expected O(n + u log u + p) time.
Java's ordered map gives O(n log u + p) time.
Storage is O(u + p), including output.

## Edge cases

When target is twice a value, two occurrences are required per pair.
An odd leftover occurrence stays unused.
Absent complements contribute no output.

## Common mistakes

A set alone loses duplicate multiplicities.
Emitting every cross-product of matching occurrences reuses elements and overcounts disjoint pairs.

## Language notes

Python uses `Counter` and arbitrary-precision complement arithmetic.
Java computes the complement as a long and checks its range before looking it up as an integer key.
