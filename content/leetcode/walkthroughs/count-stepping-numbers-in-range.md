## Intuition
A stepping number has adjacent digits differing by exactly one.
Digit DP counts valid numbers up to a bound while carrying the previous digit, tightness, and whether a nonleading digit has started.

## Brute force
Enumerating every number in `[low, high]` is impossible for long decimal bounds.
Digit DP visits each position-state once and subtracts the count below low from the count below high.

## Approach
1. Count valid positive stepping numbers from zero through `high`.
2. Count the same range through `low - 1` and subtract modulo 1e9+7.
3. At each digit, keep zero as a leading placeholder until a nonzero digit starts the number.
4. After starting, allow only a digit one away from the previous digit.

## Walkthrough
Example 1 is `[1,20]`.
The valid values are `1` through `9`, then `10` and `12`, for a total of 11.
The DP counts all valid prefixes up to 20 and subtracts the count through 0, leaving those 11 values.

## Complexity
For D bound digits, there are O(D * 11 * 2) cached states and up to ten transitions each, so time and space are O(D).
The Python cache is recreated per bound, and Java recreates its memo table per count call.

## Edge cases
The leading-placeholder state prevents zero from being counted as a positive stepping number.
When low equals high, subtraction leaves one value exactly when it is valid.
The lower bound can become zero after subtracting one from low equal to one.

## Common mistakes
Treating leading zero as a previous digit rejects valid one-digit numbers.
Allowing equal adjacent digits violates the exact difference-one rule.
Forgetting the modulo adjustment can produce a negative answer.

## Language notes
Python uses an `lru_cache` and a helper for the next previous-digit state.
Java stores nullable `Long` states and uses `BigInteger` to form the decimal lower bound safely.
