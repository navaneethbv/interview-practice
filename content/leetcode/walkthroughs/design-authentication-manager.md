## Intuition

Each token's state is one number, its expiry time. Since time only moves forward and every update sets expiry to now plus a fixed TTL, the most recently updated token always expires last, so tokens kept in update order are also in expiry order.

## Approach

1. Store `expiry[token]` in an insertion-ordered map.
2. Before each operation, remove tokens from the front whose expiry is at most the current time.
3. `generate` inserts a token at the end.
4. `renew` moves a live token to the end with a new expiry; an expired token was already removed.
5. `countUnexpiredTokens` returns the map size.

## Walkthrough

In Example 1 with TTL 5, aaa is generated at 2 and expires at 7. The renewal at 8 is too late. bbb is generated at 7, renewed at 10 to expire at 15, and is expired at 15, so the count is 0.

## Complexity

- Time: O(1) amortized per call.
- Space: O(tokens).

## Edge cases

- Expiry is exclusive: a token is gone at exactly its expiry time.
- Renewing an unknown token does nothing.

## Common mistakes

- Treating a token that expires at the current time as still valid.
- Renewing without moving the token to the end of the order.

## Reference notes

The Python reference keeps a plain dictionary and counts on demand, which is simpler and fast enough for these limits.
