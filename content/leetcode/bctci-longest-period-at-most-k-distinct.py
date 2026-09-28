class Solution:
    def longestAtMostKDistinct(self, bestSeller, k):
        counts = {}
        left = best = 0
        for right, title in enumerate(bestSeller):
            counts[title] = counts.get(title, 0) + 1
            while len(counts) > k:
                leaving = bestSeller[left]
                counts[leaving] -= 1
                if counts[leaving] == 0:
                    del counts[leaving]
                left += 1
            best = max(best, right - left + 1)
        return best
