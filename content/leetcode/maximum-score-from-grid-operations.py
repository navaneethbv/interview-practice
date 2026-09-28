NEG = -10 ** 30

class Solution:

    def maximumScore(self, grid):
        n = len(grid)
        dp = [[NEG] * (n + 1) for _ in range(n + 1)]
        dp[0] = [0] * (n + 1)
        for col in range(n):
            prefix = [0]
            for row in range(n):
                prefix.append(prefix[-1] + grid[row][col])
            limit = n + 1 if col < n - 1 else 1
            dp = [self._next_row(dp, prefix, b, limit) for b in range(n + 1)]
        return max((row[0] for row in dp))

    def _next_row(self, dp, prefix, b, limit):
        """With this column painted to height b, the best score for each next-column height c."""
        n = len(prefix) - 1
        pre = []
        best = NEG
        for a in range(n + 1):
            best = max(best, dp[a][b])
            pre.append(best)
        suffix = [NEG] * (n + 2)
        for a in range(n, -1, -1):
            suffix[a] = max(suffix[a + 1], dp[a][b] + max(0, prefix[a] - prefix[b]))
        row = [NEG] * (n + 1)
        for c in range(limit):
            row[c] = max(pre[c] + max(0, prefix[c] - prefix[b]), suffix[c + 1])
        return row
