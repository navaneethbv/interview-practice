# All O`one Data Structure

Maintain positive occurrence counts for string keys.
`inc(key)` adds one, inserting a missing key at count 1.
`dec(key)` subtracts one and removes a key reaching zero.
`getMaxKey()` and `getMinKey()` return any key with the maximum or minimum count, or an empty string if none exist.
Ties may be resolved arbitrarily.
Every operation should take O(1) average time.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Keys contain 1 to 10 lowercase English letters.
- A key passed to dec always exists.
- At most 50000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["inc", "inc", "inc", "getMaxKey", "getMinKey"], args = [["a"], ["a"], ["b"], [], []]
Output: [null, null, null, "a", "b"]
Explanation: Counts are a=2 and b=1.
```

### Example 2

```text
Input: ctor = [], ops = ["inc", "dec", "getMaxKey"], args = [["x"], ["x"], []]
Output: [null, null, ""]
Explanation: Decrementing the only occurrence removes the key.
```
