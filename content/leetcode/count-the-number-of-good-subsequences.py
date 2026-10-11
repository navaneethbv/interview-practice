from collections import Counter
from math import comb


class Solution:
    def countGoodSubsequences(self, s):
        mod = 10 ** 9 + 7
        counts = Counter(s).values()
        total = 0
        for f in range(1, max(counts) + 1):
            ways = 1
            for c in counts:
                ways = ways * (1 + comb(c, f)) % mod
            total = (total + ways - 1) % mod
        return total
