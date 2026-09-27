class Solution:
    def combinationSum4(self, nums, target):
        ways = [1] + [0]*target
        for total in range(1, target+1):
            ways[total] = sum(ways[total-value] for value in nums if value <= total)
        return ways[target]
