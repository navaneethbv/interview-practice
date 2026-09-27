class Solution:
    def maxCoins(self, nums):
        values = [1]+nums+[1]
        n = len(values)
        dp = [[0]*n for _ in range(n)]
        for gap in range(2,n):
            for left in range(n-gap):
                right = left+gap
                dp[left][right] = max(dp[left][last]+dp[last][right]+values[left]*values[last]*values[right] for last in range(left+1,right))
        return dp[0][-1]
