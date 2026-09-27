# First Bad Version

Versions are numbered from 1 through `n`.
Once a version becomes defective, every later version is defective too.
Return the first defective version, using the provided `isBadVersion(version)` API and as few calls as possible.
The testcase field `bad` configures the API; it is not an argument to your method.

## Examples

```text
Input: n = 7, bad = 5
Output: 5
Explanation: Versions 1 through 4 are good.
```

```text
Input: n = 1, bad = 1
Output: 1
Explanation: The only version is defective.
```

## Constraints

- 1 <= bad <= n <= 2^31 - 1
- At least one version is defective.
