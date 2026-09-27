import heapq
class Solution:
    def swimInWater(self, grid):
        n = len(grid)
        queue, seen = [(grid[0][0],0,0)], set()
        while queue:
            level,r,c = heapq.heappop(queue)
            if (r,c) in seen:
                continue
            seen.add((r,c))
            if r == c == n-1:
                return level
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0 <= a < n and 0 <= b < n and (a,b) not in seen:
                    heapq.heappush(queue,(max(level,grid[a][b]),a,b))
