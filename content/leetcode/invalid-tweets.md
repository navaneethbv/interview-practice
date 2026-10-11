# Invalid Tweets

Find the ids of tweets whose content is longer than 15 characters.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `tweet_id`; row order is unrestricted.

## Tables

### Tweets

| Column | SQLite type |
| --- | --- |
| tweet_id | INTEGER |
| content | TEXT |

## Constraints

- tweet_id is unique.
- content contains only letters, digits, spaces and punctuation.

## Examples

### Example 1

```text
Input: {"tables": {"Tweets": [[1, "Let us Code"], [2, "More than fifteen chars are here!"]]}}
Output: [[2]]
Explanation: Only the second tweet exceeds 15 characters.
```

### Example 2

```text
Input: {"tables": {"Tweets": [[3, "exactly 15 char"], [4, "sixteen chars!!!"]]}}
Output: [[4]]
Explanation: A tweet of exactly 15 characters is valid.
```
