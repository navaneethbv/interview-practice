from collections import Counter
class Solution:
    def canPermutePalindrome(self, s):
        odd_counts = sum(count % 2 for count in Counter(s).values())
        return odd_counts <= 1
