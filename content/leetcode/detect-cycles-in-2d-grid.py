class Solution:
    def containsCycle(self, grid):
        m,n=len(grid),len(grid[0]);seen=set()
        for r in range(m):
            for c in range(n):
                if (r,c) in seen:continue
                seen.add((r,c));stack=[(r,c,-1,-1)]
                while stack:
                    a,b,pr,pc=stack.pop()
                    for x,y in ((a-1,b),(a+1,b),(a,b-1),(a,b+1)):
                        if 0<=x<m and 0<=y<n and grid[x][y]==grid[a][b] and (x,y)!=(pr,pc):
                            if (x,y) in seen:return True
                            seen.add((x,y));stack.append((x,y,a,b))
        return False
