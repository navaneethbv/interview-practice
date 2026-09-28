class Matrix:
    def __init__(self, grid):
        self.grid = [row[:] for row in grid]

    def transpose(self):
        n = len(self.grid)
        for r in range(n):
            for c in range(r + 1, n):
                self.grid[r][c], self.grid[c][r] = self.grid[c][r], self.grid[r][c]

    def rotate_clockwise(self):
        self.transpose()
        self.reflect_vertically()

    def rotate_anticlockwise(self):
        self.transpose()
        self.reflect_horizontally()

    def reflect_horizontally(self):
        self.grid.reverse()

    def reflect_vertically(self):
        for row in self.grid:
            row.reverse()

    def get_grid(self):
        return [row[:] for row in self.grid]
