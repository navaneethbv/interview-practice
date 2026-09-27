from collections import Counter
class Solution:
    def findTargetSumWays(self, nums, target):
        ways = Counter({0:1})
        for value in nums:
            updated = Counter()
            for total,count in ways.items():
                updated[total+value] += count
                updated[total-value] += count
            ways = updated
        return ways[target]
