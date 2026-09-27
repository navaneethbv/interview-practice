class Solution:
    def canPartition(self, nums):
        total = sum(nums)
        if total % 2:
            return False

        target = total // 2
        reachable_sums = 1
        for value in nums:
            reachable_sums |= reachable_sums << value
        return bool(reachable_sums & (1 << target))
