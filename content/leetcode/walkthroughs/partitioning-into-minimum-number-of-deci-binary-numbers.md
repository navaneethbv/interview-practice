## Intuition
A deci-binary number has only 0 and 1 digits, so each decimal position needs one summand for every unit in the target digit.
The largest digit is therefore both a lower bound and an achievable number of summands.

## Brute force
Constructing summands digit by digit works but repeatedly processes every position and summand.
The maximum digit proves the answer without creating any numbers.

## Approach
1. Scan the decimal digits.
2. Track the largest digit encountered.
3. Return that largest digit as the minimum number of deci-binary summands.

## Walkthrough
Example 1 is `n = "32"`.
The digits are 3 and 2, so at least three summands are needed to provide three units in the tens place.
Three deci-binary numbers can supply that digit and cover the smaller units, so the answer is 3.

## Complexity
Scanning L characters takes O(L) time.
The Python `max` call and Java loop use O(1) auxiliary space.

## Edge cases
A number containing digit 9 requires nine summands.
Leading zeroes, if supplied by a permissive caller, do not affect the maximum.
The string `"0"` would return zero under the direct digit rule.

## Common mistakes
Counting nonzero digits ignores digit magnitude.
Converting a very long input to a machine integer can overflow, so scan characters.
Returning the sum of digits overestimates the number of summands.

## Language notes
Python's `max` returns the largest character, whose integer conversion gives the digit.
Java converts each character by subtracting `'0'` and tracks an integer maximum.
