class Solution:
    def containsCycle(self, grid):
        seen = set()
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if (row, column) not in seen:
                    if self._cycle_from(grid, row, column, seen):
                        return True
        return False

    def _cycle_from(self, grid, row, column, seen):
        rows = len(grid)
        columns = len(grid[0])
        seen.add((row, column))
        stack = [(row, column, -1, -1)]
        directions = ((-1, 0), (1, 0), (0, -1), (0, 1))
        while stack:
            current_row, current_column, parent_row, parent_column = stack.pop()
            for row_delta, column_delta in directions:
                next_row = current_row + row_delta
                next_column = current_column + column_delta
                inside = 0 <= next_row < rows and 0 <= next_column < columns
                same_value = inside and grid[next_row][next_column] == grid[current_row][current_column]
                is_parent = (next_row, next_column) == (parent_row, parent_column)
                if not inside or not same_value or is_parent:
                    continue
                if (next_row, next_column) in seen:
                    return True
                seen.add((next_row, next_column))
                stack.append((next_row, next_column, current_row, current_column))
        return False
