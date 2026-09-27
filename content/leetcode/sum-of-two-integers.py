class Solution:
    def getSum(self, a, b):
        mask = 0xffffffff
        a, b = a & mask, b & mask
        while b:
            a, b = (a ^ b) & mask, ((a & b) << 1) & mask
        return a if a < 0x80000000 else ~(a ^ mask)
