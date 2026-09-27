class Solution:
    def minPathSum(self, grid):
        dp=[float('inf')]*len(grid[0]);dp[0]=0
        for row in grid:
            for c,value in enumerate(row):dp[c]=value+min(dp[c],dp[c-1] if c else float('inf'))
        return dp[-1]
