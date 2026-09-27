class Solution:
    def wordBreak(self, s, wordDict):
        words = set(wordDict)
        limit = max(map(len, words))
        dp = [True] + [False] * len(s)
        for end in range(1, len(s) + 1):
            dp[end] = self._can_finish_word(s, end, limit, words, dp)
        return dp[-1]

    def _can_finish_word(self, s, end, limit, words, dp):
        for start in range(max(0, end - limit), end):
            if dp[start] and s[start:end] in words:
                return True
        return False
