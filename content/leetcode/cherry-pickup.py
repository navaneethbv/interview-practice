from itertools import product
class Solution:
    def cherryPickup(self, grid):
        size = len(grid)
        best = {(0, 0): grid[0][0]}
        for step in range(1, 2 * size - 1):
            best = self._advance(grid, step, best)
        return max(0, best.get((size - 1, size - 1), 0))

    def _advance(self, grid, step, dp):
        """Both walkers take one step; states are keyed by their rows."""
        next_best = {}
        for (first_row, second_row), value in dp.items():
            for next_first_row, next_second_row in product(
                (first_row, first_row + 1), (second_row, second_row + 1)
            ):
                gain = self._gain(
                    grid,
                    next_first_row,
                    step - next_first_row,
                    next_second_row,
                    step - next_second_row,
                )
                if gain is None:
                    continue
                state = (next_first_row, next_second_row)
                next_best[state] = max(next_best.get(state, -1), value + gain)
        return next_best

    def _gain(self, grid, r1, c1, r2, c2):
        size = len(grid)
        if not all(0 <= coordinate < size for coordinate in (r1, c1, r2, c2)):
            return None
        if grid[r1][c1] < 0 or grid[r2][c2] < 0:
            return None
        gain = grid[r1][c1]
        if r1 != r2:
            gain += grid[r2][c2]
        return gain
