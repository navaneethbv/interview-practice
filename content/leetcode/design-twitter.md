# Design Twitter

Build a small social feed service.
`postTweet(userId, tweetId)` records a new tweet.
`getNewsFeed(userId)` returns up to 10 newest tweet IDs from that user and the users they currently follow, newest first.
`follow(followerId, followeeId)` adds a follow relationship, and `unfollow` removes it if present.
A user's own tweets always appear in their feed, regardless of follow relationships.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["postTweet", "postTweet", "follow", "getNewsFeed", "unfollow", "getNewsFeed"], args = [[1, 10], [2, 20], [1, 2], [1], [1, 2], [1]]
Output: [null, null, null, [20, 10], null, [10]]
Explanation: Following user 2 includes tweet 20; unfollowing removes it while retaining user 1's tweet.
```

### Example 2

```text
Input: ctor = [], ops = ["getNewsFeed", "postTweet", "getNewsFeed"], args = [[3], [3, 7], [3]]
Output: [[], null, [7]]
Explanation: A user with no posts has an empty feed; posting tweet 7 makes it visible.
```

## Constraints

- 1 <= user IDs <= 500.
- 0 <= tweetId <= 10000, and posted tweet IDs are unique.
- A user does not follow or unfollow themselves in these tests.
- At most 30000 method calls occur per test.
