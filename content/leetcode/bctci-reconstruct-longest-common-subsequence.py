class Solution:
    def longestCommonSubsequence(self, s1, s2):
        n, m = len(s1), len(s2)
        table = [[0] * (m + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                if s1[i] == s2[j]:
                    table[i][j] = table[i + 1][j + 1] + 1
                else:
                    table[i][j] = max(table[i + 1][j], table[i][j + 1])
        result, i, j = [], 0, 0
        while i < n and j < m:
            if s1[i] == s2[j]:
                result.append(s1[i])
                i, j = i + 1, j + 1
            elif table[i + 1][j] >= table[i][j + 1]:
                i += 1
            else:
                j += 1
        return "".join(result)
