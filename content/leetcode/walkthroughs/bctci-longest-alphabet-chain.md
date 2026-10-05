## Intuition

Every complete alphabet cycle consumes one occurrence of all 26 letters.
The least frequent letter limits the number of complete cycles.
After removing those cycles, at least one letter is absent, so any remaining extension is a contiguous run of available letters on the circular alphabet.

## Brute force

Try each starting letter and repeatedly consume the required next letter from a copied frequency array.
This is workable with 26 starts but repeatedly simulates long chains instead of separating complete cycles from their remainder.

## Approach

Count occurrences in the 26-entry array `counts`.
Set `cycles` to the minimum count and remove that many copies of every letter conceptually.
Scan the alphabet twice using `index % 26`.
Increase `run` when the residual count is positive and reset it when the letter is unavailable.
Track the largest run as `best` and return `cycles * 26 + best`.
The doubled scan captures runs crossing from z to a, and the guaranteed missing residual letter prevents an invalid full extra cycle.

## Walkthrough

Example 1 is `azbc`.
Most letters have count zero, so `cycles = 0`.
The available letters form the circular consecutive sequence `z, a, b, c`.
The first alphabet pass sees a length-three run at a through c and later a single z.
The second pass extends that z through a, b, and c, reaching `best = 4`.
The answer is 4.

## Complexity

Counting takes O(n) time and scanning 52 positions takes constant time.
The 26 counters and a few scalar variables require O(1) auxiliary space.

## Edge cases

Empty input returns zero.
Repeated copies of one letter do not extend a chain because its successor is still required.

## Common mistakes

Do not sort and count ordinary runs without handling z-to-a wraparound.
Residual frequencies greater than one cannot bypass a missing intervening letter.

## Language notes

Python subtracts `cycles` from its counts explicitly.
Java keeps original counts and tests whether each is greater than `cycles`, implementing the same residual-presence test.
