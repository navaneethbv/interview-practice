# Design Authentication Manager

Tokens expire `timeToLive` seconds after they were generated or last renewed.
`generate(tokenId, currentTime)` creates a new token.
`renew(tokenId, currentTime)` extends an unexpired token to expire `timeToLive` seconds after `currentTime`; renewing an expired or unknown token does nothing.
`countUnexpiredTokens(currentTime)` counts tokens that have not expired.
A token expiring at time `t` is already expired at time `t`, even if a call at `t` tries to renew it.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `currentTime` strictly increases across calls.
- `generate` is called with distinct token ids.

## Examples

### Example 1

```text
Input: ctor = [5], ops = ["renew", "generate", "countUnexpiredTokens", "generate", "renew", "renew", "countUnexpiredTokens"], args = [["aaa", 1], ["aaa", 2], [6], ["bbb", 7], ["aaa", 8], ["bbb", 10], [15]]
Output: [null, null, 1, null, null, null, 0]
Explanation: Token aaa expires at 7, before the renewal at 8; bbb is renewed at 10 and expires at 15, so none remain at 15.
```

### Example 2

```text
Input: ctor = [3], ops = ["generate", "countUnexpiredTokens", "countUnexpiredTokens"], args = [["x", 1], [3], [4]]
Output: [null, 1, 0]
Explanation: A token generated at 1 with lifetime 3 expires at 4.
```
