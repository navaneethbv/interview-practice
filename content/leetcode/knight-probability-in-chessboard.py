class Solution:
    def knightProbability(self, n, k, row, column):
        current = {(row, column): 1.0}
        moves = ((1, 2), (1, -2), (-1, 2), (-1, -2), (2, 1), (2, -1), (-2, 1), (-2, -1))
        for _ in range(k):
            next_probabilities = {}
            for (current_row, current_column), probability in current.items():
                for row_step, column_step in moves:
                    next_row = current_row + row_step
                    next_column = current_column + column_step
                    if 0 <= next_row < n and 0 <= next_column < n:
                        destination = (next_row, next_column)
                        next_probabilities[destination] = next_probabilities.get(destination, 0.0) + probability / 8
            current = next_probabilities
        return sum(current.values())
