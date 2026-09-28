## Intuition

The input contains a logical prefix followed by padding.
Only the prefix belongs to the output, so scan exactly `trueLength` characters and expand spaces as they are copied.

## Approach

1. Create an empty output builder.
2. Iterate over indices from zero through `trueLength - 1`.
3. Append `%20` for a space and the original character for every other character.
4. Return the builder contents.

## Walkthrough

For `value = "Mr John Smith    "` and `trueLength = 13`, the logical prefix ends immediately after `h` in `Smith`.
The scan copies `Mr`, expands the first space, copies `John`, expands the second space, and copies `Smith`.
The four trailing padding spaces are never examined as logical input.

## Complexity

- Time: O(n), where `n` is `trueLength`.
- Space: O(n) for the returned string.

## Edge cases

A logical length of zero returns the empty string.
Leading and trailing spaces inside the logical prefix are converted.
Padding after the logical prefix must not leak into the output.

## Common mistakes

- Replacing spaces in the entire buffer includes padding.
- Trimming the prefix removes meaningful leading or trailing spaces.
- Using a fixed-size output array without accounting for the extra two characters per space can truncate the result.

## Language notes

Python can slice the logical prefix and use `replace`.
Java visits Unicode code points and uses `StringBuilder.appendCodePoint` so supplementary characters count once and remain intact.
