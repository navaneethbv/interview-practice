class Solution:
    def wordBreak(self, s, wordDict):
        words = set(wordDict)
        return self._sentences(s, words, 0, {})

    def _sentences(self, s, words, start, memo):
        """Return all ways to split the suffix beginning at start."""
        if start == len(s):
            return [""]
        if start in memo:
            return memo[start]
        sentences = []
        for end in range(start + 1, len(s) + 1):
            word = s[start:end]
            if word not in words:
                continue
            for suffix in self._sentences(s, words, end, memo):
                separator = " " if suffix else ""
                sentences.append(word + separator + suffix)
        memo[start] = sentences
        return sentences
