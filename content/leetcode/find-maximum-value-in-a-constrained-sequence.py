class Solution:
    def findMaxVal(self, n, restrictions, diff):
        values = [10 ** 18] * n
        values[0] = 0
        for index, value in restrictions:
            values[index] = value
        for index in range(1, n):
            values[index] = min(values[index], values[index - 1] + diff[index - 1])
        for index in range(n - 2, -1, -1):
            values[index] = min(values[index], values[index + 1] + diff[index])
        return max(values)
