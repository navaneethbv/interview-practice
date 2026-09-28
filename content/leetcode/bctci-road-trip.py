class Solution:
    def minDetour(self, times):
        n = len(times)
        if n < 3:
            return 0
        best = [0] * (n + 1)
        for stop in range(n):
            previous = [best[stop - gap] for gap in range(0, 3) if stop - gap >= 0]
            best[stop + 1] = times[stop] + min(previous) if stop >= 3 else times[stop]
        return min(best[n - 2:n + 1])
