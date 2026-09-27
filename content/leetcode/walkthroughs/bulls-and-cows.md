## Intuition
Count bulls first because those exact matches cannot also be cows.
Then count all shared digit occurrences and subtract bulls to obtain misplaced matches.

## Brute force
Trying to match every unmatched secret digit against every guess digit can be quadratic.
Ten digit frequency counters make the multiset overlap constant-space.

## Approach
1. Count equal-position digits as bulls.
2. Count each digit in both complete strings.
3. Sum the minimum count for each digit to get total shared occurrences.
4. Return bulls and `shared - bulls` in the required hint format.

## Walkthrough
For Example 1, `secret = 1807` and `guess = 7810` have one bull, the 8.
The total digit overlap is four, so the remaining three matches are cows and the answer is `1A3B`.
For `1123` and `0111`, one 1 is a bull and only one additional 1 can match, producing `1A1B`.

## Complexity
The strings are scanned a constant number of times, so time is O(n).
The two ten-entry arrays use O(1) auxiliary space.

## Edge cases
All digits may be bulls, leaving zero cows.
Repeated digits cannot be reused beyond their available counts.

Counting all shared digits before subtracting bulls handles repeated digits without assigning a single occurrence to two matches.

## Common mistakes
Subtract bulls from shared matches before reporting cows.
Do not count a correctly placed digit twice.
Use digit frequency overlap rather than set intersection.

## Language notes
Python uses `Counter` intersection.
Java uses two fixed arrays and a ten-digit loop.
