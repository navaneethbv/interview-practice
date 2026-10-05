class Solution:
    MOD = 1_000_000_007

    def countZeroPaths(self, grid):
        cols = len(grid[0])
        previous = [0] * cols
        for r, row in enumerate(grid):
            current = [0] * cols
            for c, cell in enumerate(row):
                if cell == 1:
                    continue
                if r == 0 and c == 0:
                    current[c] = 1
                    continue
                ways = previous[c]
                if c > 0:
                    ways += current[c - 1] + previous[c - 1]
                current[c] = ways % self.MOD
            previous = current
        return previous[-1]
