class Solution:
    def longestConsecutive(self, nums):
        values = set(nums)
        best = 0
        for x in values:
            if x - 1 not in values:
                end = x
                while end in values:
                    end += 1
                best = max(best, end - x)
        return best
