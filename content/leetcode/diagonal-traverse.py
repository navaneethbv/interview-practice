class Solution:
    def findDiagonalOrder(self, mat):
        rows = len(mat)
        columns = len(mat[0])
        result = []

        for diagonal in range(rows + columns - 1):
            first_row = max(0, diagonal - columns + 1)
            last_row = min(rows - 1, diagonal)
            values = [
                mat[row][diagonal - row]
                for row in range(first_row, last_row + 1)
            ]
            if diagonal % 2 == 0:
                values.reverse()
            result.extend(values)

        return result
