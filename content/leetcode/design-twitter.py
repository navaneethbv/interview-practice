class Twitter:
    def __init__(self):
        self.posts = []
        self.following = {}

    def postTweet(self, userId, tweetId):
        self.posts.append((userId, tweetId))

    def getNewsFeed(self, userId):
        followed_users = self.following.get(userId, set())
        visible_users = followed_users | {userId}
        news_feed = []

        for author_id, tweet_id in reversed(self.posts):
            if author_id in visible_users:
                news_feed.append(tweet_id)
                if len(news_feed) == 10:
                    break

        return news_feed

    def follow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).add(followeeId)

    def unfollow(self, followerId, followeeId):
        self.following.get(followerId, set()).discard(followeeId)
