class Solution:
    def countSquares(self, matrix):
        previous = [0] * (len(matrix[0]) + 1)
        total = 0
        for row in matrix:
            current = [0]
            for column, value in enumerate(row):
                count = (1 + min(previous[column], previous[column + 1], current[-1])
                         if value else 0)
                current.append(count)
                total += count
            previous=current
        return total
