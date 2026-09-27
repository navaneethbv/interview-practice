from collections import deque


class Solution:
    def wallsAndGates(self, rooms):
        if not rooms or not rooms[0]:
            return

        rows, columns = len(rooms), len(rooms[0])
        queue = deque()

        for row in range(rows):
            for column in range(columns):
                if rooms[row][column] == 0:
                    queue.append((row, column))

        while queue:
            row, column = queue.popleft()
            distance = rooms[row][column]
            for next_row, next_column in (
                (row - 1, column),
                (row + 1, column),
                (row, column - 1),
                (row, column + 1),
            ):
                if (
                    0 <= next_row < rows
                    and 0 <= next_column < columns
                    and rooms[next_row][next_column] == 2147483647
                ):
                    rooms[next_row][next_column] = distance + 1
                    queue.append((next_row, next_column))
