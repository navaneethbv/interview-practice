class Solution:
    def generate(self, numRows):
        triangle = []
        for row_index in range(numRows):
            row = [1] * (row_index + 1)
            for column in range(1, row_index):
                row[column] = triangle[row_index - 1][column - 1] + triangle[row_index - 1][column]
            triangle.append(row)
        return triangle
