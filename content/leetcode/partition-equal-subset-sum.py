class Solution:
    def canPartition(self, nums):
        total = sum(nums)
        if total%2:
            return False
        bits = 1
        for value in nums:
            bits |= bits<<value
        return bool(bits & (1<<(total//2)))
