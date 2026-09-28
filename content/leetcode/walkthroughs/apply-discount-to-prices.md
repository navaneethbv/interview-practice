## Intuition

A price token has a strict lexical shape: `$` followed by one or more digits and nothing else.
Valid tokens can be parsed as whole cents after multiplying by the undiscounted percentage, then formatted with two decimal places.

## Brute force

Replacing every dollar sign would corrupt tokens such as `10$` and `$x`.
Splitting into words lets each token be validated independently.

## Approach

1. Split the sentence on its guaranteed single spaces.
2. Validate a word with `_is_price` or the Java helper.
3. Multiply its integer dollars by `100 - discount` to get discounted cents.
4. Format whole dollars and a two-digit remainder, then join words with spaces.

## Walkthrough

For Example 1, `pay $100 or $5 today` has valid price words `$100` and `$5`.
At a 20 percent discount, their cent values are 8000 and 400, formatting as `$80.00` and `$4.00`.
Other words remain unchanged, producing the expected sentence.

## Complexity

For total sentence length L, validation and formatting cost O(L) time and the split/output words use O(L) space.
Python's `split` creates word strings, while Java creates a `String[]` and formats each valid token.
The local price bound fits Java `long` after multiplying by 100.

## Edge cases

`$0` is valid and becomes `$0.00`.
A token with letters, a trailing dollar sign, or no digits is unchanged.
A 100 percent discount produces zero cents.

## Common mistakes

Require the dollar sign to be the first character.
Preserve non-price words exactly.
Pad a one-digit cents remainder with a leading zero.

## Language notes

Python's `isdigit` matches the local decimal token contract.
Java validates ASCII digits explicitly and uses a helper for two-digit formatting.
