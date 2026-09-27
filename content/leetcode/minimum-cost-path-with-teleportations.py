INFINITY=10**18
class Solution:
    def minCost(self, grid, k):
        rows,cols=len(grid),len(grid[0]); distance=[[INFINITY]*cols for _ in range(rows)]; distance[0][0]=0
        self._relax(grid,distance)
        levels=sorted({value for row in grid for value in row},reverse=True)
        for _ in range(k):
            distance=self._teleport(grid,distance,levels)
            self._relax(grid,distance)
        return distance[-1][-1]

    def _relax(self, grid, values):
        """Moves right or down, paying the destination cell's cost."""
        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if r: values[r][c]=min(values[r][c],values[r-1][c]+grid[r][c])
                if c: values[r][c]=min(values[r][c],values[r][c-1]+grid[r][c])

    def _teleport(self, grid, distance, levels):
        """One free teleport to any cell whose value is at most the current cell's."""
        best=dict.fromkeys(levels,INFINITY)
        for r,row in enumerate(grid):
            for c,value in enumerate(row): best[value]=min(best[value],distance[r][c])
        running=INFINITY
        for value in levels: running=min(running,best[value]); best[value]=running
        return [[best[value] for value in row] for row in grid]
