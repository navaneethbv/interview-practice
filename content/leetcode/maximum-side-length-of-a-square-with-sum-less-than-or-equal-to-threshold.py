class Solution:
    def maxSideLength(self, mat, threshold):
        rows,cols=len(mat),len(mat[0]); prefix=[[0]*(cols+1) for _ in range(rows+1)]
        for r in range(rows):
            for c in range(cols): prefix[r+1][c+1]=mat[r][c]+prefix[r][c+1]+prefix[r+1][c]-prefix[r][c]
        def possible(size):
            return any(prefix[r+size][c+size]-prefix[r][c+size]-prefix[r+size][c]+prefix[r][c]<=threshold for r in range(rows-size+1) for c in range(cols-size+1))
        left,right=0,min(rows,cols)
        while left<right:
            middle=(left+right+1)//2
            if possible(middle): left=middle
            else: right=middle-1
        return left
