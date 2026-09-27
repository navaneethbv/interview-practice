class NumMatrix:
    def __init__(self,matrix):
        m,n=len(matrix),len(matrix[0]);self.prefix=[[0]*(n+1) for _ in range(m+1)]
        for r in range(m):
            for c in range(n):self.prefix[r+1][c+1]=matrix[r][c]+self.prefix[r][c+1]+self.prefix[r+1][c]-self.prefix[r][c]
    def sumRegion(self,row1,col1,row2,col2):
        p=self.prefix
        return p[row2+1][col2+1]-p[row1][col2+1]-p[row2+1][col1]+p[row1][col1]
