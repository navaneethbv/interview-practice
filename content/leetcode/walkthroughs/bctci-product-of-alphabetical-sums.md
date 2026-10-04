## Intuition

Only a word's alphabetical sum affects the answer.
With one to three lowercase letters, every sum lies between 1 and 78.
Compressing all words into this tiny set makes it cheap to enumerate two factors and look up the required third.

## Brute force

Try every ordered triple of words, allowing repeated choices, and multiply their sums.
That costs O(n³) checks and ignores how many words share the same numerical sum.

## Approach

Build the set `sums` by adding each letter's position from 1 through 26.
For every `first` and `second` in that set, compute `product = first * second`.
If target is divisible by product, check whether `target // product` belongs to sums.
Return true on the first match and false after exhausting all pairs.
Reusing a sum is allowed because the statement permits choosing the same word multiple times.
Every feasible triple supplies a pair visited by the loops, and exact divisibility recovers its third factor.

## Walkthrough

Example 1 includes `abc` with sum 6 and `nop` with sum 45.
For `first = 6` and `second = 6`, product is 36.
The target 1620 is divisible by 36, and its quotient is 45.
Since 45 is in `sums`, the method returns true.
This corresponds to selecting `abc` twice and `nop` once, exactly as permitted.

## Complexity

Building sums takes O(n) time because each word has at most three characters.
If U distinct sums occur, the search takes O(U²) expected time and O(U) space.
Since U is at most 78, the overall asymptotic cost is O(n) time and O(1) bounded auxiliary space.

## Edge cases

No words produce an empty set and false.
Different words with the same sum can be deduplicated safely.

## Common mistakes

Do not require three distinct indices.
Test divisibility before integer division so a truncated quotient cannot create a false match.

## Language notes

Python uses character code differences and a set comprehension.
Java uses a `HashSet<Integer>`; pair products are at most 78² and safely fit int.
