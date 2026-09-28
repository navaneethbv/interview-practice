class NumMatrix:
    def __init__(self, matrix):
        self.rows = len(matrix)
        self.columns = len(matrix[0])
        self.values = [[0] * self.columns for _ in range(self.rows)]
        self.tree = [[0] * (self.columns + 1) for _ in range(self.rows + 1)]
        for row in range(self.rows):
            for column in range(self.columns):
                self.update(row, column, matrix[row][column])

    def update(self, row, column, value):
        delta = value - self.values[row][column]
        self.values[row][column] = value
        tree_row = row + 1
        while tree_row <= self.rows:
            tree_column = column + 1
            while tree_column <= self.columns:
                self.tree[tree_row][tree_column] += delta
                tree_column += tree_column & -tree_column
            tree_row += tree_row & -tree_row

    def _prefix(self, row, column):
        total = 0
        while row > 0:
            current_column = column
            while current_column > 0:
                total += self.tree[row][current_column]
                current_column -= current_column & -current_column
            row -= row & -row
        return total

    def sumRegion(self, row1, col1, row2, col2):
        return (self._prefix(row2 + 1, col2 + 1)
                - self._prefix(row1, col2 + 1)
                - self._prefix(row2 + 1, col1)
                + self._prefix(row1, col1))
