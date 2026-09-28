class Solution:
    def grayCode(self, n):
        values = []
        for number in range(1 << n):
            values.append(number ^ (number >> 1))
        return values
