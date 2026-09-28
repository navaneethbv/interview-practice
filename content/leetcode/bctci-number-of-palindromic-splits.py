class Solution:
    MOD = 1_000_000_007

    def countPalindromicSplits(self, s):
        n = len(s)
        if n == 0:
            return 0
        palindrome = [[False] * n for _ in range(n)]
        for start in range(n - 1, -1, -1):
            for end in range(start, n):
                if s[start] == s[end] and (end - start < 2 or palindrome[start + 1][end - 1]):
                    palindrome[start][end] = True
        ways = [0] * (n + 1)
        ways[0] = 1
        for end in range(1, n + 1):
            ways[end] = sum(ways[start] for start in range(end) if palindrome[start][end - 1]) % self.MOD
        return ways[n]
