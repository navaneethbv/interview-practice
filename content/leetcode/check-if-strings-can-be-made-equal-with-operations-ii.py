from collections import Counter
class Solution:
    def checkStrings(self, s1, s2):return Counter(s1[::2])==Counter(s2[::2]) and Counter(s1[1::2])==Counter(s2[1::2])
