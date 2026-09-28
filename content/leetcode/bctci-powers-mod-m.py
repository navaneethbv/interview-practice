class Solution:
    def powerMod(self, a, p, m):
        if p == 0:
            return 1 % m
        half = self.powerMod(a, p // 2, m)
        result = half * half % m
        return result * (a % m) % m if p % 2 else result
