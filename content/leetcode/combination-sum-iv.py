class Solution:
    def combinationSum4(self, nums, target):
        ways = [1] + [0] * target
        for total in range(1, target + 1):
            for value in nums:
                if value <= total:
                    ways[total] += ways[total - value]
        return ways[target]
