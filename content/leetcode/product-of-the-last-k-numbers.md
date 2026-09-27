# Product of the Last K Numbers

Maintain a stream of integers.
`add(num)` appends a value and `getProduct(k)` returns the product of the last k values.
Zeros must be handled correctly.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Values range from 0 to 100.
- Each query has `1 <= k <= current stream length`.
- Every queried product and product of any contiguous stream segment fits a signed 32-bit integer.
- At most 40000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["add", "add", "add", "getProduct", "getProduct"], args = [[3], [0], [2], [1], [3]]
Output: [null, null, null, 2, 0]
Explanation: A suffix containing zero has product zero.
```

### Example 2

```text
Input: ctor = [], ops = ["add", "add", "getProduct"], args = [[2], [5], [2]]
Output: [null, null, 10]
Explanation: The two most recent values multiply to 10.
```
