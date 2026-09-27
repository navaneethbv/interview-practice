## Intuition
Reversing the entire character array reverses both the word order and every word's letters.
Reversing each word afterward restores its internal order while keeping the reversed word positions.
Both transformations happen in place, so no second character array is needed.

## Brute force
Splitting into strings, reversing the list, and joining it is straightforward but uses O(N) extra storage.
The required in-place contract favors two passes of swaps instead.

## Approach
1. Reverse the complete array.
2. Scan for spaces and reverse each word's character range.
3. Include the final word by treating the array length as an end sentinel.
4. Perform every swap directly in the input array.

## Walkthrough
Example 1 starts as `one two` in the character array.
Reversing the whole array gives `owt eno`.
The first word range `owt` is reversed to `two`.
The second range `eno` is reversed to `one`.
The final array is `two one`, exactly the stated output.

## Complexity
The complete reversal and all word reversals touch each character a constant number of times.
Time is O(N), and the helper variables use O(1) extra space.

## Edge cases
A one-word array is reversed twice and returns to its original spelling.
A single-character word needs no swaps.
The statement guarantees one spaces between words and no leading or trailing spaces.

## Common mistakes
Reversing only the whole array leaves every word backwards.
Allocating split strings breaks the O(1) space requirement.
Failing to process the range ending at the array length omits the last word.

## Language notes
Python mutates the supplied list through tuple assignment in the swap helper.
Java mutates the `char[]` and uses a helper with explicit temporary storage.
Neither implementation creates substrings or a replacement array.
