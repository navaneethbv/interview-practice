class Solution:
    def kthSmallest(self, matrix, k):
        left = matrix[0][0]
        right = matrix[-1][-1]
        size = len(matrix)

        while left < right:
            middle = (left + right) // 2
            count = 0
            column = size - 1

            for row in matrix:
                while column >= 0 and row[column] > middle:
                    column -= 1
                count += column + 1

            if count < k:
                left = middle + 1
            else:
                right = middle

        return left
