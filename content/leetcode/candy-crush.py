class Solution:
    def candyCrush(self, board):
        while True:
            crush = self._crushable(board)
            if not crush:
                return board
            for row, column in crush:
                board[row][column] = 0
            self._drop(board)

    def _crushable(self, board):
        rows, columns = len(board), len(board[0])
        crush = set()
        for row in range(rows):
            for column in range(columns):
                value = board[row][column]
                if value and column + 2 < columns and value == board[row][column + 1] == board[row][column + 2]:
                    crush.update(
                        [(row, column), (row, column + 1), (row, column + 2)]
                    )
                if value and row + 2 < rows and value == board[row + 1][column] == board[row + 2][column]:
                    crush.update(
                        [(row, column), (row + 1, column), (row + 2, column)]
                    )
        return crush

    def _drop(self, board):
        rows = len(board)
        for column in range(len(board[0])):
            values = [board[row][column] for row in range(rows) if board[row][column]]
            values = [0] * (rows - len(values)) + values
            for row, value in enumerate(values):
                board[row][column] = value
