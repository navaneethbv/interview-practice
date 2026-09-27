class Solution:
    def maxScore(self, cardPoints, k):
        score=sum(cardPoints[:k]); best=score
        for taken_right in range(1,k+1):
            score+=cardPoints[-taken_right]-cardPoints[k-taken_right]; best=max(best,score)
        return best
