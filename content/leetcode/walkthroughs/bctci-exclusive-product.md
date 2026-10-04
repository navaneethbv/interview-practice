## Intuition

Everything except index i separates naturally into the prefix before i and the suffix after i.
Multiplying those two products avoids division completely.
This also handles zeros without special cases or modular inverses.

## Brute force

For every output position, multiply all other input values and reduce modulo `MOD`.
That takes O(n²) time because most factors are multiplied repeatedly.

## Approach

Initialize `prefix = 1` and scan from left to right.
Store the current prefix in `result[i]` before multiplying it by `arr[i]` modulo 1,000,000,007.
Then scan right to left with `suffix = 1`.
Multiply each stored prefix by the current suffix modulo `MOD`, then incorporate `arr[i]` into the suffix.
Both update orders exclude the element at i from its own answer.
The identity value one represents the empty prefix before the first element and empty suffix after the last.

## Walkthrough

Example 1 uses `[1, 3, 2, 1]`.
The first pass stores prefix products `[1, 1, 3, 6]`.
The reverse pass starts with suffix 1, producing 6 at index 3 and 3 at index 2.
After including the value 2, the suffix becomes 2, producing 2 at index 1.
Including the value 3 makes the suffix 6, producing 6 at index 0.
The result is `[6, 2, 3, 6]`.

## Complexity

Two scans take O(n) time.
Python uses O(1) auxiliary space beyond the returned `result` array.
Java additionally keeps a `long[] result` beside its returned `int[] answer`, so its auxiliary space is O(n).

## Edge cases

With one zero, only the zero's position can have a nonzero answer.
With at least two zeros, every answer is zero.

## Common mistakes

Do not include `arr[i]` before storing its exclusive product.
Ordinary division and modular division are both unnecessary and fail to simplify zero handling.

## Language notes

Java uses long multiplication before taking the modulus, then safely casts the reduced value to int.
Python integers avoid fixed-width overflow.
