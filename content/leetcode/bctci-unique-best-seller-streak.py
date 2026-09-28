class Solution:
    def hasUniqueStreak(self, bestSeller, k):
        counts = {}
        repeated = 0
        for day, title in enumerate(bestSeller):
            counts[title] = counts.get(title, 0) + 1
            if counts[title] == 2:
                repeated += 1
            if day >= k:
                leaving = bestSeller[day - k]
                counts[leaving] -= 1
                if counts[leaving] == 1:
                    repeated -= 1
            if day >= k - 1 and repeated == 0:
                return True
        return False
