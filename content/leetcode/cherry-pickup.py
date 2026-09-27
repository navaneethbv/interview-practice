class Solution:
    def cherryPickup(self,grid):
        n=len(grid);dp={(0,0):grid[0][0]}
        for step in range(1,2*n-1):
            nxt={}
            for (a,b),value in dp.items():
                for r1 in (a,a+1):
                    for r2 in (b,b+1):
                        c1,c2=step-r1,step-r2
                        if not(0<=r1<n and 0<=r2<n and 0<=c1<n and 0<=c2<n):continue
                        if grid[r1][c1]<0 or grid[r2][c2]<0:continue
                        gain=grid[r1][c1]+(grid[r2][c2] if r1!=r2 else 0)
                        nxt[r1,r2]=max(nxt.get((r1,r2),-1),value+gain)
            dp=nxt
        return max(0,dp.get((n-1,n-1),0))
