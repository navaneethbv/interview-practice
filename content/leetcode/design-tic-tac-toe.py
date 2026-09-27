class TicTacToe:
    def __init__(self, n):
        self.n = n
        self.rows = [0] * n
        self.columns = [0] * n
        self.diagonal = 0
        self.anti_diagonal = 0

    def move(self, row, col, player):
        mark = 1 if player == 1 else -1
        self.rows[row] += mark
        self.columns[col] += mark

        if row == col:
            self.diagonal += mark
        if row + col == self.n - 1:
            self.anti_diagonal += mark

        has_line = (
            abs(self.rows[row]) == self.n
            or abs(self.columns[col]) == self.n
            or abs(self.diagonal) == self.n
            or abs(self.anti_diagonal) == self.n
        )
        return player if has_line else 0
