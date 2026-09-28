class Solution:
    def longestGoodStreak(self, sales):
        best = run = 0
        for value in sales:
            run = run + 1 if value >= 10 else 0
            best = max(best, run)
        return best
