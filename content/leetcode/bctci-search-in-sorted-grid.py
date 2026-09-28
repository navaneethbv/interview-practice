class Solution:
    def searchGrid(self, grid, target):
        cols = len(grid[0])
        low, high = 0, len(grid) * cols - 1
        while low <= high:
            mid = (low + high) // 2
            row, col = divmod(mid, cols)
            if grid[row][col] == target:
                return [row, col]
            if grid[row][col] < target:
                low = mid + 1
            else:
                high = mid - 1
        return [-1, -1]
