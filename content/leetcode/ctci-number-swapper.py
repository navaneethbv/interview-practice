class Solution:
    def swapNumbers(self, a, b):
        a ^= b
        b ^= a
        a ^= b
        return [a, b]
