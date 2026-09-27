class Solution:
    def findDiagonalOrder(self, mat):
        m,n=len(mat),len(mat[0]);out=[]
        for d in range(m+n-1):
            row=[mat[r][d-r] for r in range(max(0,d-n+1),min(m-1,d)+1)]
            out.extend(row[::-1] if d%2==0 else row)
        return out
