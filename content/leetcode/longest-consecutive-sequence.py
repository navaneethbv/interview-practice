class Solution:
    def longestConsecutive(self, nums):
        values = set(nums)
        best = 0
        for start in values:
            if start - 1 not in values:
                end = start
                while end in values:
                    end += 1
                best = max(best, end - start)
        return best
