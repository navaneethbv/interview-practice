class Solution:
    def positiveDays(self, likes, dislikes, periods):
        prefix = [0]
        for liked, disliked in zip(likes, dislikes):
            prefix.append(prefix[-1] + (1 if liked > disliked else 0))
        return [prefix[r + 1] - prefix[l] for l, r in periods]
