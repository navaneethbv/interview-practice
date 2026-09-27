class Solution:
    def pacificAtlantic(self, heights):
        rows, cols = len(heights), len(heights[0])
        def reach(starts):
            seen = set(starts)
            queue = list(seen)
            for r, c in queue:
                for nr, nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                    if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and heights[nr][nc] >= heights[r][c]:
                        seen.add((nr,nc)); queue.append((nr,nc))
            return seen
        p = reach([(0,c) for c in range(cols)] + [(r,0) for r in range(rows)])
        a = reach([(rows-1,c) for c in range(cols)] + [(r,cols-1) for r in range(rows)])
        return [list(cell) for cell in sorted(p & a)]
