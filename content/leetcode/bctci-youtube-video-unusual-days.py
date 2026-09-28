class Solution:
    def maxDeviation(self, likes, dislikes):
        scores = sorted(liked - disliked for liked, disliked in zip(likes, dislikes))
        total = sum(scores)
        best = 0
        below = 0
        for index, score in enumerate(scores):
            above = total - below - score
            deviation = score * index - below + above - score * (len(scores) - index - 1)
            best = max(best, deviation)
            below += score
        return best
