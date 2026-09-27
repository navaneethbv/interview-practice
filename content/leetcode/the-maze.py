class Solution:
    def hasPath(self, maze, start, destination):
        rows = len(maze)
        columns = len(maze[0])
        stack = [tuple(start)]
        visited = {tuple(start)}
        directions = ((1, 0), (-1, 0), (0, 1), (0, -1))

        while stack:
            row, column = stack.pop()
            if [row, column] == destination:
                return True
            for row_step, column_step in directions:
                next_row, next_column = row, column
                while (
                    0 <= next_row + row_step < rows
                    and 0 <= next_column + column_step < columns
                    and maze[next_row + row_step][next_column + column_step] == 0
                ):
                    next_row += row_step
                    next_column += column_step
                stop = (next_row, next_column)
                if stop not in visited:
                    visited.add(stop)
                    stack.append(stop)
        return False
