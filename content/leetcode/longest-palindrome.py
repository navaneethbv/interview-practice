from collections import Counter
class Solution:
    def longestPalindrome(self, s):
        pairs = sum(n//2*2 for n in Counter(s).values())
        return pairs+(pairs<len(s))
