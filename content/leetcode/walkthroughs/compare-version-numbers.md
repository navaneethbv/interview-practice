## Intuition

Version components are compared numerically, and missing trailing components count as zero.
Splitting at dots exposes those components directly.

## Brute force

Comparing version strings lexicographically gives wrong results when component digit lengths differ.
For example, 10 must be greater than 9 despite its first character.

## Approach

1. Split both versions at dots.
2. Walk through the longer component list.
3. Treat a missing component as zero.
4. Return on the first numeric difference or zero if all components match.

## Walkthrough

Example 1:

For 2.03 and 2.3.0, the first components both equal 2.
The next components parse as 3 and 3, and the missing final component is zero.
The versions are equal, so the answer is 0.

## Complexity

For A and B component characters, splitting and parsing take O(A+B) time.
The component arrays use O(A+B) space in Python and Java.
Numeric parsing uses the problem's bounded component assumptions.

## Edge cases

Leading zeroes do not change a component's numeric value.
Trailing zero components are equivalent to omitted components.
The first differing component determines the result.

## Common mistakes

Do not compare the original strings as text.
Do not treat a missing component as smaller than zero.
Return only -1, 0, or 1.

## Language notes

Python builds integer component lists explicitly.
Java uses split with an escaped dot and parses each available component.
Both implementations ignore formatting zeroes after numeric parsing.
Their comparison stops as soon as a component differs.
The extra Example 1 label identifies the same local sample used by the judge.
