## Intuition

Parsing has three phases: skip leading spaces, read one optional sign, then consume consecutive digits.
Any later character ends the numeric prefix.
The accumulator is clamped as soon as the next digit would leave the 32-bit range.

## Brute force

A direct baseline first extracts the complete digit prefix into a new string, requiring O(n) time and temporary space for extraction.
A fixed-width conversion may then fail on overflow instead of returning the required clamp.
A bounded scan avoids the copy and handles overflow before it occurs.

## Approach

1. Advance `index` past leading spaces without copying the string.
2. Read an optional sign and choose magnitude limit 2147483647 or 2147483648.
3. Before appending each digit, check whether `value * 10 + digit` would exceed that limit.
4. If so, return the signed endpoint immediately, since later digits cannot reduce the magnitude.
5. Otherwise update `value`, stop at the first nondigit, and return `value * sign`.

## Walkthrough

Example 1 uses s = "   -42rest".
The parser skips three spaces.
It reads the minus sign and sets sign to -1.
It consumes 4 and then 2, producing value 42.
The next character is r, so parsing stops and returns -42.

## Complexity

- Time: O(n), for the single scan after leading-space handling.
- Space: O(1), using a few integer variables.

## Edge cases

A string with no digits returns zero.
A sign without digits also returns zero.
Leading zeroes do not change the numeric value.
Values beyond either endpoint clamp to that endpoint.
An exact magnitude of 2147483648 is allowed only for a negative result.
Additional digits after that magnitude trigger the negative clamp rather than wrapping around.

## Common mistakes

- Accepting spaces after the sign as digits.
- Continuing after the first nondigit.
- Applying the sign after an overflow check based on the wrong limit.
- Returning a machine-dependent integer instead of the specified 32-bit clamp.

## Language notes

Both versions scan the original string and keep the accumulator bounded.
Python compares against `(limit - digit) // 10`.
Java uses a `long` accumulator and a pre-multiplication helper so the allowed negative magnitude never overflows an `int` before its sign is applied.
