class Solution:
    def wordBreak(self, s, wordDict):
        words = set(wordDict)
        limit = max(map(len, words))
        dp = [True] + [False]*len(s)
        for end in range(1, len(s)+1):
            dp[end] = any(dp[start] and s[start:end] in words for start in range(max(0, end-limit), end))
        return dp[-1]
