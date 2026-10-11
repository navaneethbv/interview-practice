## Intuition

A tweet is invalid when its text is too long, so the answer is a filter on the length of `content`.

## Approach

1. Scan Tweets.
2. Compute `LENGTH(content)` for each row.
3. Keep rows whose length is greater than 15 and return `tweet_id`.

## Walkthrough

In Example 1, "Let us Code" has 11 characters and stays valid, while the second tweet has more than 15 and is reported. In Example 2, a 15-character tweet is valid and the 16-character one is not.

## Complexity

- Time: O(T) for T tweets: one scan with a constant-time length per row.
- Space: proportional to the result and any grouping state.

## Edge cases

- Exactly 15 characters is valid because the rule is strictly greater than 15.
- An empty tweet has length 0.
- An empty table returns no rows.

## Common mistakes

- Using `>=` reports 15-character tweets.
- Counting bytes instead of characters; SQLite's `LENGTH` counts characters for text values.

## SQLite notes

`LENGTH` on a TEXT value returns its number of characters. MySQL's `CHAR_LENGTH` is the equivalent there.
