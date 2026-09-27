from collections import deque


class Solution:
    def updateBoard(self, board, click):
        row, column = click
        if board[row][column] == "M":
            board[row][column] = "X"
            return board

        rows = len(board)
        columns = len(board[0])
        queue = deque([(row, column)])
        visited = {(row, column)}

        while queue:
            row, column = queue.popleft()
            neighbors = self._neighbors(row, column, rows, columns)
            mine_count = sum(
                board[next_row][next_column] == "M"
                for next_row, next_column in neighbors
            )
            board[row][column] = str(mine_count) if mine_count else "B"

            if mine_count == 0:
                for next_row, next_column in neighbors:
                    cell = (next_row, next_column)
                    if board[next_row][next_column] == "E" and cell not in visited:
                        visited.add(cell)
                        queue.append(cell)

        return board

    @staticmethod
    def _neighbors(row, column, rows, columns):
        return [
            (next_row, next_column)
            for next_row in range(row - 1, row + 2)
            for next_column in range(column - 1, column + 2)
            if 0 <= next_row < rows
            and 0 <= next_column < columns
            and (next_row, next_column) != (row, column)
        ]
