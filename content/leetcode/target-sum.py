from collections import Counter


class Solution:
    def findTargetSumWays(self, nums, target):
        ways = Counter({0: 1})

        for value in nums:
            next_ways = Counter()
            for total, count in ways.items():
                next_ways[total + value] += count
                next_ways[total - value] += count
            ways = next_ways

        return ways[target]
