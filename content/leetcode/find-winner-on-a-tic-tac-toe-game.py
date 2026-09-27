class Solution:
    def tictactoe(self, moves):
        rows = [0] * 3
        columns = [0] * 3
        diagonal = 0
        anti_diagonal = 0
        for index, (row, column) in enumerate(moves):
            mark = 1 if index % 2 == 0 else -1
            rows[row] += mark
            columns[column] += mark
            if row == column:
                diagonal += mark
            if row + column == 2:
                anti_diagonal += mark
            totals = (rows[row], columns[column], diagonal, anti_diagonal)
            if any(abs(total) == 3 for total in totals):
                return 'A' if mark == 1 else 'B'
        return 'Draw' if len(moves) == 9 else 'Pending'
