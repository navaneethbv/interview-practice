class Solution:
    def generateMatrix(self, n):
        result = [[0] * n for _ in range(n)]
        top = left = 0
        bottom = right = n - 1
        value = 1
        while top <= bottom:
            value = self._fill_top(result, top, left, right, value)
            top += 1
            value = self._fill_right(result, right, top, bottom, value)
            right -= 1
            if top <= bottom:
                value = self._fill_bottom(result, bottom, right, left, value)
                bottom -= 1
            if left <= right:
                value = self._fill_left(result, left, bottom, top, value)
                left += 1
        return result

    def _fill_top(self, matrix, row, left, right, value):
        for column in range(left, right + 1):
            matrix[row][column] = value
            value += 1
        return value

    def _fill_right(self, matrix, column, top, bottom, value):
        for row in range(top, bottom + 1):
            matrix[row][column] = value
            value += 1
        return value

    def _fill_bottom(self, matrix, row, right, left, value):
        for column in range(right, left - 1, -1):
            matrix[row][column] = value
            value += 1
        return value

    def _fill_left(self, matrix, column, bottom, top, value):
        for row in range(bottom, top - 1, -1):
            matrix[row][column] = value
            value += 1
        return value
