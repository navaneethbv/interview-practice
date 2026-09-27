## Intuition

To make a number small, an earlier larger digit should be removed before a later smaller digit.
A monotonic increasing stack keeps the smallest prefix possible.
After the scan, any remaining removals come from the largest suffix digits.

## Brute force

Trying every choice of k removed positions takes exponential time.
Checking all resulting strings and selecting the smallest also copies many candidates.
The monotonic stack makes each digit enter and leave at most once.

## Approach

1. Scan digits from left to right.
2. While removals remain and the stack ends with a larger digit, pop that digit.
3. Append the current digit.
4. Remove a suffix when k still remains after the scan.
5. Strip leading zeroes and return zero when no digit remains.

## Walkthrough

Example 1 processes 1432219 with k 3.
When 3 arrives, it removes 4, leaving 13.
The first 2 removes 3, leaving 12, and the next 2 is retained.
When the final 1 arrives, it removes that trailing 2, leaving 121 before 9 is appended.
The result is 1219 after exactly three removals.

## Complexity

For n digits, each digit is pushed and popped at most once, giving O(n) time.
The stack uses O(n) auxiliary space.
Removing leading zeroes and returning the string are output-sensitive within O(n).
The result can be zero even when the retained stack contains only zeroes.

## Edge cases

Removing all digits returns zero.
A nondecreasing input removes from the end.
Leading zeroes are stripped after removals, not treated as numerical digits during comparison.
Repeated digits do not need special handling.

## Common mistakes

- Removing a later smaller digit instead of an earlier larger digit misses the greedy improvement.
- Forgetting leftover suffix removals leaves too many digits.
- Returning an empty string instead of zero violates the contract.
- Stripping zeroes before choosing removals changes digit order.

## Language notes

Python stores characters in a list and slices its suffix when needed.
Java uses StringBuilder and charAt without an input character-array copy.
Both preserve the original digit order among retained characters.
