## Intuition
IPv4 and IPv6 have distinct separator counts and component rules.
Validate one complete format at a time, rejecting leading zeroes, out-of-range decimal values, empty components, and invalid hexadecimal characters.

## Brute force
A loose parser could split on either separator and then attempt numeric conversion with exception handling.
It still needs O(n) validation, but exception based parsing often accepts malformed leading zeroes or mixed separators.
Explicit character checks make each rule visible.

## Approach
1. Split with dots while preserving empty trailing fields.
2. Validate exactly four decimal parts with no leading zero unless the part is `0`, and value at most 255.
3. If that fails, split with colons and validate exactly eight nonempty hexadecimal parts of length at most four.
4. Return `Neither` when both formats fail.

## Walkthrough
Example 1 is `192.0.2.1`.
Splitting by dots produces four parts: `192`, `0`, `2`, and `1`.
Each part contains only decimal digits, the zero part is a valid single zero, and 192 is within 255.
The method accepts the IPv4 form and returns `IPv4`.

## Complexity
For input length n, both validation passes together take O(n) time.
Python split creates component strings, and Java split creates arrays and component strings, so auxiliary space is O(n).

## Edge cases
`0.0.0.0` is valid IPv4.
`01.2.3.4` is invalid because of the leading zero.
IPv6 compression using `::` is invalid under this contract because exactly eight groups are required.

## Common mistakes
Using a normal split that drops trailing empty fields can accept `1.2.3.4.`.
Allowing signed decimal text accepts characters outside IPv4 syntax.
Parsing IPv6 groups as decimal rejects valid letters A through F.

## Language notes
Python uses `isascii` and `isdigit` before integer conversion.
Java performs indexed character checks and avoids integer parsing overflow for oversized decimal parts.
