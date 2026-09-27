class Solution:
    def longestPalindromeSubseq(self, s):
        lengths = [0] * len(s)
        for left in range(len(s) - 1, -1, -1):
            diagonal = 0
            lengths[left] = 1
            for right in range(left + 1, len(s)):
                previous = lengths[right]
                if s[left] == s[right]:
                    lengths[right] = diagonal + 2
                else:
                    lengths[right] = max(lengths[right], lengths[right - 1])
                diagonal = previous
        return lengths[-1]
