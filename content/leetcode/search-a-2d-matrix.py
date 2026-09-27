class Solution:
    def searchMatrix(self, matrix, target):
        columns = len(matrix[0])
        left = 0
        right = len(matrix) * columns - 1
        while left <= right:
            middle = left + (right - left) // 2
            value = matrix[middle // columns][middle % columns]
            if value == target:
                return True
            if value < target:
                left = middle + 1
            else:
                right = middle - 1
        return False
