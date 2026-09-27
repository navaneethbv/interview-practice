from itertools import product
class Solution:
    def cherryPickup(self,grid):
        n=len(grid);dp={(0,0):grid[0][0]}
        for step in range(1,2*n-1):
            dp=self._advance(grid,step,dp)
        return max(0,dp.get((n-1,n-1),0))

    def _advance(self, grid, step, dp):
        """Both walkers take one step; states are keyed by their rows."""
        nxt={}
        for (a,b),value in dp.items():
            for r1,r2 in product((a,a+1),(b,b+1)):
                gain=self._gain(grid,r1,step-r1,r2,step-r2)
                if gain is not None:nxt[r1,r2]=max(nxt.get((r1,r2),-1),value+gain)
        return nxt

    def _gain(self, grid, r1, c1, r2, c2):
        n=len(grid)
        if not all(0<=x<n for x in (r1,c1,r2,c2)):return None
        if grid[r1][c1]<0 or grid[r2][c2]<0:return None
        return grid[r1][c1]+(grid[r2][c2] if r1!=r2 else 0)
