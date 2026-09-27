class Solution:
    def maxSumDivThree(self, nums):
        best = [0, float("-inf"), float("-inf")]
        for value in nums:
            following = best[:]
            for remainder, total in enumerate(best):
                new_remainder = (remainder + value) % 3
                following[new_remainder] = max(following[new_remainder], total + value)
            best = following
        return best[0]
