class Solution:
    def findPath(self, grid):
        rows, cols = len(grid), len(grid[0])
        dead_ends = set()
        path = []

        def reach(row, col):
            if row >= rows or col >= cols or grid[row][col] == 1 or (row, col) in dead_ends:
                return False
            path.append([row, col])
            if (row, col) == (rows - 1, cols - 1) or reach(row, col + 1) or reach(row + 1, col):
                return True
            path.pop()
            dead_ends.add((row, col))
            return False

        return path if reach(0, 0) else []
