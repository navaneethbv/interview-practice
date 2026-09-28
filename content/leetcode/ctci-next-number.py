class Solution:
    def nextNumbers(self, n):
        return [self._next(n), self._previous(n)]

    def _next(self, n):
        value, zeros, ones = n, 0, 0
        while value & 1 == 0:
            zeros += 1
            value >>= 1
        while value & 1:
            ones += 1
            value >>= 1
        if zeros + ones >= 31:
            return -1
        return n + (1 << zeros) + (1 << (ones - 1)) - 1

    def _previous(self, n):
        value, zeros, ones = n, 0, 0
        while value & 1:
            ones += 1
            value >>= 1
        if value == 0:
            return -1
        while value & 1 == 0:
            zeros += 1
            value >>= 1
        return n - (1 << ones) - (1 << (zeros - 1)) + 1
