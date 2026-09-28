class Solution:
    def minCost(self, n, cuts):
        positions = [0] + sorted(cuts) + [n]
        size = len(positions)
        dp = [[0] * size for _ in range(size)]
        for gap in range(2, size):
            for left in range(size - gap):
                right = left + gap
                best = float('inf')
                for middle in range(left + 1, right):
                    best = min(best, dp[left][middle] + dp[middle][right])
                dp[left][right] = positions[right] - positions[left] + best
        return dp[0][-1]
