class Solution:
    EVEN_BITS = 0x55555555
    ODD_BITS = 0xAAAAAAAA

    def swapOddEvenBits(self, n):
        bits = n & 0xFFFFFFFF
        swapped = ((bits & self.ODD_BITS) >> 1) | ((bits & self.EVEN_BITS) << 1)
        swapped &= 0xFFFFFFFF
        return swapped - (1 << 32) if swapped >= 1 << 31 else swapped
