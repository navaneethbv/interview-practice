from itertools import combinations
class Solution:
    def maximumRows(self, matrix, numSelect):
        row_masks = []
        for row in matrix:
            mask = 0
            for column, value in enumerate(row):
                if value == 1:
                    mask |= 1 << column
            row_masks.append(mask)

        best = 0
        for selected_columns in combinations(range(len(matrix[0])), numSelect):
            selected_mask = 0
            for column in selected_columns:
                selected_mask |= 1 << column
            covered = sum((row_mask & selected_mask) == row_mask for row_mask in row_masks)
            best = max(best, covered)
        return best
