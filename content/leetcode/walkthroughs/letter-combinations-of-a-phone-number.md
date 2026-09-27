## Intuition

Each digit selects one small alphabet of letters.
After processing a prefix of digits, append every letter for the next digit to every existing prefix.
The Cartesian product of these choices is exactly the set of phone combinations.

## Brute force

The direct Cartesian-product enumeration creates at most 4^d strings for d digits, and copying each length-d string costs O(d × 4^d) time and output space.
The layered construction used here performs exactly that necessary enumeration while reusing the current prefix list for each digit.
## Approach

1. Map each digit from 2 through 9 to its letters in key_to_letters.
2. Return an empty list when digits is empty.
3. Start combinations with one empty prefix.
4. For each digit, build next combinations by appending each mapped letter to every current prefix.
5. Replace combinations with that new layer and return it.

The method processes digits from left to right, so every output has the same order as the input digits.
Digits 7 and 9 naturally contribute four choices through the same loop.

## Walkthrough

Example 1 uses digits = 2.

| digit | combinations before | letters | combinations after |
| --- | --- | --- | --- |
| 2 | `[""]` | a, b, c | `["a", "b", "c"]` |

The returned list contains one letter for each choice on key 2.
For a longer input, the next layer would append each new letter to all three prefixes.

## Complexity

Let d be the number of digits and b be the maximum number of letters on a key.
There are at most b^d outputs, and creating each output string costs O(d), so time is O(d × b^d).
The returned strings use O(d × b^d) space, with a temporary layer of the same output scale.

## Edge cases

An empty digit string returns no combinations.
Digits 7 and 9 produce four branches instead of three.
The input contract contains digits 2 through 9, so no mapping is needed for zero or one.
A single digit returns its mapped letters directly.

## Common mistakes

- Returning an empty string for empty input creates a result that was not requested.
- Reusing only the latest prefix loses combinations from other prefixes.
- Treating every key as three letters omits choices for 7 and 9.
- Mutating a shared string builder without restoring its length mixes branches.

## Language notes

Python builds each layer with a list comprehension and string concatenation.
Java uses nextCombinations and replaces combinations after each digit.
Java indexing converts a digit character to its numeric key with digit minus zero.
