class Solution:
    def maximalSquare(self, matrix):
        previous_row = [0] * (len(matrix[0]) + 1)
        largest_side = 0
        for row in matrix:
            current_row = [0]
            for column, cell in enumerate(row):
                if cell == '1':
                    side = 1 + min(previous_row[column], previous_row[column + 1],
                                    current_row[-1])
                else:
                    side = 0
                current_row.append(side)
                largest_side = max(largest_side, side)
            previous_row = current_row
        return largest_side * largest_side
