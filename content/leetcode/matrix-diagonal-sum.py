class Solution:
    def diagonalSum(self, mat):
        size = len(mat)
        total = 0
        for index in range(size):
            total += mat[index][index]
            opposite = size - index - 1
            if opposite != index:
                total += mat[index][opposite]
        return total
