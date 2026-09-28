class Solution:
    DIRECTIONS = [(1, 0), (0, -1), (-1, 0), (0, 1)]

    def spiralOrder(self, n):
        grid = [[0] * n for _ in range(n)]
        row = col = n // 2
        value, leg, direction = 1, 1, 0
        while value < n * n:
            for _ in range(2):
                dr, dc = self.DIRECTIONS[direction]
                for _ in range(leg):
                    if value == n * n:
                        return grid
                    row, col = row + dr, col + dc
                    grid[row][col] = value
                    value += 1
                direction = (direction + 1) % 4
            leg += 1
        return grid
