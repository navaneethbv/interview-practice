class Solution:
    def minCost(self, grid, k):
        rows,cols=len(grid),len(grid[0]); infinity=10**18; distance=[[infinity]*cols for _ in range(rows)]; distance[0][0]=0
        def relax(values):
            for r in range(rows):
                for c in range(cols):
                    if r: values[r][c]=min(values[r][c],values[r-1][c]+grid[r][c])
                    if c: values[r][c]=min(values[r][c],values[r][c-1]+grid[r][c])
        relax(distance)
        levels=sorted({value for row in grid for value in row},reverse=True)
        for _ in range(k):
            best={value:infinity for value in levels}
            for r in range(rows):
                for c in range(cols): best[grid[r][c]]=min(best[grid[r][c]],distance[r][c])
            running=infinity
            for value in levels: running=min(running,best[value]); best[value]=running
            following=[[best[grid[r][c]] for c in range(cols)] for r in range(rows)]
            relax(following); distance=following
        return distance[-1][-1]
