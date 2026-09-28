class Solution:
    def minCost(self, nums, cost):
        pairs = sorted(zip(nums, cost))
        half = (sum(cost) + 1) // 2
        running = 0
        target = pairs[0][0]
        for value, weight in pairs:
            running += weight
            if running >= half:
                target = value
                break
        total = 0
        for value, weight in zip(nums, cost):
            total += abs(value - target) * weight
        return total
