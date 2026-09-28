class Solution:
    def insertBits(self, N, M, i, j):
        width = j - i + 1
        window = ((1 << width) - 1) << i
        return (N & ~window) | (M << i)
