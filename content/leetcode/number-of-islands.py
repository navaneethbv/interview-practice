class Solution:
    def numIslands(self, grid):
        rows, cols = len(grid), len(grid[0])
        seen = set()
        islands = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] != '1' or (r,c) in seen:
                    continue
                islands += 1
                seen.add((r,c)); queue = [(r,c)]
                for x,y in queue:
                    for nx,ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                        if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == '1' and (nx,ny) not in seen:
                            seen.add((nx,ny)); queue.append((nx,ny))
        return islands
