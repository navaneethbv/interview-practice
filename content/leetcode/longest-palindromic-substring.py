class Solution:
    def longestPalindrome(self, s):
        start = 0
        best_length = 1
        for center in range(len(s)):
            length = max(self._expand(s, center, center),
                         self._expand(s, center, center + 1))
            if length > best_length:
                start = center - (length - 1) // 2
                best_length = length
        return s[start:start + best_length]

    def _expand(self, s, left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
