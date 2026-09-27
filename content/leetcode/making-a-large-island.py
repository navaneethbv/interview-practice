class Solution:
    def largestIsland(self, grid):
        n=len(grid);sizes={0:0};label=2
        for r in range(n):
            for c in range(n):
                if grid[r][c]!=1:continue
                stack=[(r,c)];grid[r][c]=label;size=0
                while stack:
                    a,b=stack.pop();size+=1
                    for x,y in ((a-1,b),(a+1,b),(a,b-1),(a,b+1)):
                        if 0<=x<n and 0<=y<n and grid[x][y]==1:grid[x][y]=label;stack.append((x,y))
                sizes[label]=size;label+=1
        best=max(sizes.values())
        for r in range(n):
            for c in range(n):
                if grid[r][c]==0:
                    nearby={grid[a][b] for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)) if 0<=a<n and 0<=b<n}
                    best=max(best,1+sum(sizes[i] for i in nearby))
        return best
