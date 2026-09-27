class Solution:
    def findMissingAndRepeatedValues(self, grid):
        size = len(grid)
        counts = [0] * (size * size + 1)
        for row in grid:
            for value in row:
                counts[value] += 1
        repeated = next(value for value in range(1, size * size + 1) if counts[value] == 2)
        missing = next(value for value in range(1, size * size + 1) if counts[value] == 0)
        return [repeated, missing]
