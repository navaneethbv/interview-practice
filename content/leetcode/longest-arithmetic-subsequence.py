class Solution:
    def longestArithSeqLength(self, nums):
        best = 2
        ending = [{} for _ in nums]
        for right in range(len(nums)):
            for left in range(right):
                difference = nums[right] - nums[left]
                length = ending[left].get(difference, 1) + 1
                ending[right][difference] = max(
                    ending[right].get(difference, 0), length)
                best = max(best, length)
        return best
