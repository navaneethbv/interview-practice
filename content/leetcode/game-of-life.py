class Solution:
    def gameOfLife(self, board):
        rows = len(board)
        columns = len(board[0])
        for row in range(rows):
            for column in range(columns):
                live_neighbors = self._count_live_neighbors(board, row, column)
                alive = board[row][column] & 1
                if live_neighbors == 3 or (alive and live_neighbors == 2):
                    board[row][column] |= 2
        for row in range(rows):
            for column in range(columns):
                board[row][column] >>= 1

    def _count_live_neighbors(self, board, row, column):
        rows = len(board)
        columns = len(board[0])
        total = 0
        for next_row in range(max(0, row - 1), min(rows, row + 2)):
            for next_column in range(max(0, column - 1), min(columns, column + 2)):
                if (next_row, next_column) != (row, column):
                    total += board[next_row][next_column] & 1
        return total
