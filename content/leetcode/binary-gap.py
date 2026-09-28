class Solution:
    def binaryGap(self, n):
        previous_one = None
        best = 0
        position = 0
        while n:
            if n & 1:
                if previous_one is not None:
                    best = max(best, position - previous_one)
                previous_one = position
            n >>= 1
            position += 1
        return best
