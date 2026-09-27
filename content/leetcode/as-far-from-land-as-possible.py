from collections import deque
class Solution:
    def maxDistance(self, grid):
        n=len(grid);q=deque((r,c) for r in range(n) for c in range(n) if grid[r][c]);seen=set(q)
        if not q or len(q)==n*n:return -1
        distance=-1
        while q:
            distance+=1
            for _ in range(len(q)):
                r,c=q.popleft()
                for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                    if 0<=a<n and 0<=b<n and (a,b) not in seen:seen.add((a,b));q.append((a,b))
        return distance
