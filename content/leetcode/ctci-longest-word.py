class Solution:
    def longestWord(self, words):
        known = set(words)
        memo = {}

        def splits(word, whole):
            if word in memo and not whole:
                return memo[word]
            for cut in range(1, len(word)):
                prefix, suffix = word[:cut], word[cut:]
                if prefix in known and (suffix in known or splits(suffix, False)):
                    memo[word] = True
                    return True
            if not whole:
                memo[word] = False
            return False

        for word in sorted(words, key=lambda w: (-len(w), w)):
            if splits(word, True):
                return word
        return ""
