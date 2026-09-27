class Solution:
    def maxProductPath(self, grid):
        m,n=len(grid),len(grid[0]);low=[[0]*n for _ in range(m)];high=[[0]*n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                value=grid[r][c]
                if r==c==0:low[r][c]=high[r][c]=value;continue
                candidates=[]
                if r:candidates.extend((value*low[r-1][c],value*high[r-1][c]))
                if c:candidates.extend((value*low[r][c-1],value*high[r][c-1]))
                low[r][c],high[r][c]=min(candidates),max(candidates)
        return -1 if high[-1][-1]<0 else high[-1][-1]%1000000007
