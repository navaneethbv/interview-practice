## Intuition

There are only three digit positions, so direct position permutations are small and easy to validate.
A set removes duplicate numeric results when repeated input digits produce the same number through different positions.

## Brute force

Enumerating every integer from 100 to 998 and checking whether its digits can be supplied also works, but it ignores the tiny input permutation space.
The reference instead tries exactly three distinct input positions.

## Approach

1. Choose a nonzero digit position for the hundreds place.
2. Choose a different position for the tens place.
3. Choose a third position whose digit is even for the ones place.
4. Insert the constructed number into a set and return the set size.

## Walkthrough

This is Example 1 from the local statement.
For digits `[0,2,2]`, zero cannot be the hundreds digit, so 2 must lead the number.
Using the other 2 in the tens position and 0 in the ones position creates 220.
Using 0 in the tens position and the remaining 2 in the ones position creates 202.
The set contains two distinct values, so the answer is 2.

## Complexity

The permutation enumeration takes O(d^3) time for d input positions, and the set stores O(min(450, d^3)) candidate values.
The local constraints keep d at most 10, so this direct enumeration is small.

## Edge cases

An all-odd input has no valid even ending digit.
All zeros cannot form a three-digit number because the leading digit may not be zero.
Repeated digits are allowed only as often as their separate input positions appear.

## Common mistakes

Do not reuse one input position twice.
Reject zero only in the hundreds position, not in the tens position.
Deduplicate values rather than position triples.

## Language notes

Python uses `itertools.permutations`, while Java spells out the three position loops.
Both references use a set of integer values to enforce distinct-result semantics.
