class Solution:
    def getSum(self, a, b):
        mask = 0xffffffff
        a &= mask
        b &= mask
        while b:
            carry = ((a & b) << 1) & mask
            a = (a ^ b) & mask
            b = carry
        return a if a < 0x80000000 else ~(a ^ mask)
