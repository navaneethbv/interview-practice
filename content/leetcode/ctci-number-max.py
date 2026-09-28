class Solution:
    def getMax(self, a, b):
        b_is_larger = ((a - b) >> 63) & 1
        a_is_larger = 1 ^ b_is_larger
        return a * a_is_larger + b * b_is_larger
