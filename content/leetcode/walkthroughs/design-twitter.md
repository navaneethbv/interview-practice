## Intuition

Twitter stores tweets in posting order, so a user's feed can be found by reading the newest posts first.
A user's visible authors are the user and every account they currently follow.
The first ten matching tweets are already in the required newest-first order.

## Brute force

A naive design could gather and sort every tweet from every account whenever a feed is requested, costing O(P log P) for P posts.
That repeats work for unchanged tweets and spends time on authors the user cannot see.
Scanning the existing global timeline avoids an extra sort and keeps the implementation small.

## Approach

1. Keep posts as pairs of author ID and tweet ID in the order that tweets are posted.
2. Keep following as a map from each follower to a set of followee IDs.
3. On postTweet, append one pair to posts.
4. On follow and unfollow, add or remove the followee from that follower's set.
5. On getNewsFeed, form visible_users from the requested user and their followed users.
6. Scan posts in reverse, append matching tweet IDs to news_feed, and stop after ten results.

The scan naturally handles multiple tweets by the same author and keeps the most recent one first.
Following yourself has no special effect because the requested user is included explicitly.

## Walkthrough

Example 1 starts with no tweets and no follow relationships.

| Operation | State change | Result |
| --- | --- | --- |
| postTweet(1, 10) | posts = [(1, 10)] | null |
| postTweet(2, 20) | append (2, 20) | null |
| follow(1, 2) | visible_users for user 1 can include 1 and 2 | null |
| getNewsFeed(1) | reverse scan sees 20, then 10 | [20, 10] |
| unfollow(1, 2) | remove 2 from user 1's follow set | null |
| getNewsFeed(1) | reverse scan skips author 2 and keeps 10 | [10] |

## Complexity

Let P be the number of stored posts and F be the number of followees for the requested user.
Python getNewsFeed takes O(P + F) time in the worst case because it builds the visible set and may scan all posts.
Java scans the posts and checks its existing follow set, so its worst-case time is O(P).
The data structures use O(P + total follow relationships) stored space, with O(F) temporary Python set space and O(1) temporary Java space.

## Edge cases

A user with no followees still sees their own tweets.
A user with fewer than ten visible tweets receives every visible tweet.
Unfollowing an account that was never followed leaves the state unchanged.
Older tweets remain stored even when they are temporarily hidden by an unfollow.

## Common mistakes

- Forgetting to include the requesting user in their own visible set hides their tweets.
- Sorting tweet IDs instead of using posting order produces the wrong chronology.
- Returning more than ten matching tweets violates the feed limit.
- Removing a follow relationship from a missing set can cause an avoidable error.

## Language notes

Python uses a set union to build visible_users, while Java checks the requested ID separately.
Java stores each post in an int array because the harness supplies only standard collection imports.
Both versions scan the same posts list backward, so their ordering matches even though their temporary set work differs.
