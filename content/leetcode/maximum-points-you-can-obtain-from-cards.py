class Solution:
    def maxScore(self, cardPoints, k):
        score = 0
        for index in range(k):
            score += cardPoints[index]
        best = score
        for taken_right in range(1, k + 1):
            score += cardPoints[-taken_right] - cardPoints[k - taken_right]
            best = max(best, score)
        return best
