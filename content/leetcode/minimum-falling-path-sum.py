class Solution:
    def minFallingPathSum(self,matrix):
        dp=matrix[0][:]
        for row in matrix[1:]:dp=[v+min(dp[max(0,c-1):min(len(dp),c+2)]) for c,v in enumerate(row)]
        return min(dp)
