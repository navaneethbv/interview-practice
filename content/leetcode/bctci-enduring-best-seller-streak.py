class Solution:
    def hasEnduringStreak(self, bestSeller, k):
        run = 0
        for day, title in enumerate(bestSeller):
            run = run + 1 if day > 0 and title == bestSeller[day - 1] else 1
            if run >= k:
                return True
        return False
