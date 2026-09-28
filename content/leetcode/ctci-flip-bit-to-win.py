class Solution:
    BITS = 32

    def flipBit(self, n):
        bits = n & 0xFFFFFFFF
        current = 0
        previous = 0
        best = 1
        for _ in range(self.BITS):
            if bits & 1:
                current += 1
            else:
                previous = current if bits & 2 else 0
                current = 0
            best = max(best, previous + current + 1)
            bits >>= 1
        return min(best, self.BITS)
