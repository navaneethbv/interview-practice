class Solution:
    # Grouping nonzero entries by the shared dimension skips zero products.
    def multiply(self, mat1, mat2):
        rows = len(mat1)
        shared = len(mat2)
        columns = len(mat2[0])
        result = [[0] * columns for _ in range(rows)]
        nonzero_rows = []
        for row in mat2:
            nonzero_rows.append([(column, value) for column, value in enumerate(row) if value])
        for row_index, row in enumerate(mat1):
            for shared_index, value in enumerate(row):
                if value == 0:
                    continue
                for column, other in nonzero_rows[shared_index]:
                    result[row_index][column] += value * other
        return result
