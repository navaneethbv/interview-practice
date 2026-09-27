class Solution:
    def minCostClimbingStairs(self, cost):
        older = previous = 0
        for i in range(2, len(cost)+1):
            older, previous = previous, min(previous+cost[i-1],older+cost[i-2])
        return previous
