class Solution:
    def minCost(self, n, cuts):
        positions=[0]+sorted(cuts)+[n];size=len(positions);dp=[[0]*size for _ in range(size)]
        for gap in range(2,size):
            for left in range(size-gap):
                right=left+gap;dp[left][right]=positions[right]-positions[left]+min(dp[left][mid]+dp[mid][right] for mid in range(left+1,right))
        return dp[0][-1]
