class Solution:
    def solveNQueens(self, n):
        result = []
        used_columns = set()
        used_down_diagonals = set()
        used_up_diagonals = set()
        board = []

        def visit(row):
            if row == n:
                result.append(board[:])
                return

            for column in range(n):
                down_diagonal = row - column
                up_diagonal = row + column
                if (
                    column in used_columns
                    or down_diagonal in used_down_diagonals
                    or up_diagonal in used_up_diagonals
                ):
                    continue

                used_columns.add(column)
                used_down_diagonals.add(down_diagonal)
                used_up_diagonals.add(up_diagonal)
                board.append('.' * column + 'Q' + '.' * (n - column - 1))

                visit(row + 1)

                board.pop()
                used_columns.remove(column)
                used_down_diagonals.remove(down_diagonal)
                used_up_diagonals.remove(up_diagonal)

        visit(0)
        return result
