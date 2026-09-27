class Solution:
    def diagonalSum(self, mat):
        n=len(mat);total=sum(mat[i][i]+mat[i][n-i-1] for i in range(n))
        return total-(mat[n//2][n//2] if n%2 else 0)
