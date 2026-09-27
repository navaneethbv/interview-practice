# Freedom Trail

A circular ring initially points at index zero.
Rotate it one position clockwise or counterclockwise per step, then press the button for one additional step to spell the pointed character.
Spell all characters of key in order and return the minimum total rotation and button steps.

## Constraints

- ring and key contain 1 to 100 lowercase letters.
- Every character of key occurs in ring.

## Examples

### Example 1

```text
Input: ring = "abc", key = "ca"
Output: 4
Explanation: Rotate one step to c, press, rotate one step to a, and press.
```

### Example 2

```text
Input: ring = "aaa", key = "aa"
Output: 2
Explanation: No rotation is needed, but each character needs a press.
```
