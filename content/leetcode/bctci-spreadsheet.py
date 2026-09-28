class Spreadsheet:
    def __init__(self, rows, cols):
        self.cells = [[0] * cols for _ in range(rows)]

    def set(self, row, col, value):
        self.cells[row][col] = value

    def get(self, row, col):
        return self.cells[row][col]

    def sort_columns_by_row(self, row):
        order = sorted(range(len(self.cells[row])), key=lambda col: self.cells[row][col])
        self.cells = [[line[col] for col in order] for line in self.cells]

    def sort_rows_by_column(self, col):
        self.cells.sort(key=lambda line: line[col])
