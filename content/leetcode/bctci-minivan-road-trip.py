class Solution:
    def minDetourK(self, times, k):
        n = len(times)
        best = [0] * (n + 1)
        for stop in range(n):
            window = [best[stop - gap] for gap in range(k + 1) if stop - gap >= 0]
            best[stop + 1] = times[stop] + (min(window) if stop > k else 0)
        return min(best[max(0, n - k):n + 1])
