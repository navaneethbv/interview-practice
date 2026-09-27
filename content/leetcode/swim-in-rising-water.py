import heapq


class Solution:
    def swimInWater(self, grid):
        size = len(grid)
        queue = [(grid[0][0], 0, 0)]
        visited = set()

        while queue:
            water_level, row, column = heapq.heappop(queue)
            if (row, column) in visited:
                continue
            visited.add((row, column))

            if row == size - 1 and column == size - 1:
                return water_level

            for next_row, next_column in (
                (row - 1, column),
                (row + 1, column),
                (row, column - 1),
                (row, column + 1),
            ):
                if (
                    0 <= next_row < size
                    and 0 <= next_column < size
                    and (next_row, next_column) not in visited
                ):
                    next_level = max(water_level, grid[next_row][next_column])
                    heapq.heappush(queue, (next_level, next_row, next_column))

        return -1
