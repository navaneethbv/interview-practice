class Solution:
    def solveSudoku(self, board):
        row_digits = [set() for _ in range(9)]
        column_digits = [set() for _ in range(9)]
        box_digits = [set() for _ in range(9)]
        empty_cells = []
        for row in range(9):
            for column in range(9):
                digit = board[row][column]
                if digit == '.':
                    empty_cells.append((row, column))
                else:
                    row_digits[row].add(digit)
                    column_digits[column].add(digit)
                    box_digits[self._box_index(row, column)].add(digit)
        self._board = board
        self._empty_cells = empty_cells
        self._used_digits = (row_digits, column_digits, box_digits)
        self._search(0)

    def _box_index(self, row, column):
        return (row // 3) * 3 + column // 3

    def _search(self, i):
        """Fills empty cells from index i by backtracking; returns True once the board is solved."""
        if i == len(self._empty_cells):
            return True
        row_digits, column_digits, box_digits = self._used_digits
        row, column = self._empty_cells[i]
        box = self._box_index(row, column)
        for digit in '123456789':
            if (digit in row_digits[row] or digit in column_digits[column]
                    or digit in box_digits[box]):
                continue
            self._board[row][column] = digit
            row_digits[row].add(digit)
            column_digits[column].add(digit)
            box_digits[box].add(digit)
            if self._search(i + 1):
                return True
            row_digits[row].remove(digit)
            column_digits[column].remove(digit)
            box_digits[box].remove(digit)
        self._board[row][column] = '.'
        return False
