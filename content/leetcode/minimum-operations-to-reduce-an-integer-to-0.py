class Solution:
    def minOperations(self, n):
        ops = 0
        while n:
            if n & 1:
                # A run of ones (...11) is cheaper to clear by carrying than bit by bit.
                n = n + 1 if n & 3 == 3 else n - 1
                ops += 1
            n >>= 1
        return ops
