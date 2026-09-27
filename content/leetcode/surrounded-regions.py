class Solution:
    def solve(self, board):
        if not board or not board[0]:
            return

        rows, columns = len(board), len(board[0])
        stack = []

        self._seed_boundary(board, stack, rows, columns)
        self._protect_cells(board, stack, rows, columns)
        for row in range(rows):
            for column in range(columns):
                board[row][column] = 'O' if board[row][column] == '#' else 'X'

    def _seed_boundary(self, board, stack, rows, columns):
        for row in range(rows):
            for column in range(columns):
                is_boundary = (
                    row == 0
                    or row == rows - 1
                    or column == 0
                    or column == columns - 1
                )
                if is_boundary and board[row][column] == 'O':
                    stack.append((row, column))

    def _protect_cells(self, board, stack, rows, columns):
        while stack:
            row, column = stack.pop()
            if (
                row < 0
                or row >= rows
                or column < 0
                or column >= columns
                or board[row][column] != 'O'
            ):
                continue

            board[row][column] = '#'
            stack.extend(
                (
                    (row - 1, column),
                    (row + 1, column),
                    (row, column - 1),
                    (row, column + 1),
                )
            )
