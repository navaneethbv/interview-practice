from collections import deque


class Solution:
    def orangesRotting(self, grid):
        rows, columns = len(grid), len(grid[0])
        queue = deque()
        fresh_oranges = 0

        for row in range(rows):
            for column in range(columns):
                if grid[row][column] == 2:
                    queue.append((row, column, 0))
                elif grid[row][column] == 1:
                    fresh_oranges += 1

        minutes = 0
        while queue:
            row, column, minutes = queue.popleft()
            for next_row, next_column in (
                (row - 1, column),
                (row + 1, column),
                (row, column - 1),
                (row, column + 1),
            ):
                if (
                    0 <= next_row < rows
                    and 0 <= next_column < columns
                    and grid[next_row][next_column] == 1
                ):
                    grid[next_row][next_column] = 2
                    fresh_oranges -= 1
                    queue.append((next_row, next_column, minutes + 1))

        return minutes if fresh_oranges == 0 else -1
