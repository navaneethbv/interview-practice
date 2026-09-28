class Solution:
    def bitSwapRequired(self, a, b):
        difference = (a ^ b) & 0xFFFFFFFF
        flips = 0
        while difference:
            difference &= difference - 1
            flips += 1
        return flips
