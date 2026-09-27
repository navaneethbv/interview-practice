class Twitter:
    def __init__(self): self.posts,self.following = [],{}
    def postTweet(self, userId, tweetId): self.posts.append((userId,tweetId))
    def getNewsFeed(self, userId):
        allowed = self.following.get(userId,set()) | {userId}
        result = []
        for author,tweet in reversed(self.posts):
            if author in allowed:
                result.append(tweet)
                if len(result)==10: break
        return result
    def follow(self, followerId, followeeId): self.following.setdefault(followerId,set()).add(followeeId)
    def unfollow(self, followerId, followeeId): self.following.get(followerId,set()).discard(followeeId)
