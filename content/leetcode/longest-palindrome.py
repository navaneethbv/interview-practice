from collections import Counter

class Solution:
    def longestPalindrome(self, s):
        paired_length = sum(
            count // 2 * 2
            for count in Counter(s).values()
        )
        has_center = paired_length < len(s)
        return paired_length + has_center
