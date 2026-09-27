from collections import Counter
class Solution:
    def canPermutePalindrome(self,s):return sum(c%2 for c in Counter(s).values())<=1
