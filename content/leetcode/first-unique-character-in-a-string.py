from collections import Counter
class Solution:
    def firstUniqChar(self, s):
        counts=Counter(s)
        return next((i for i,c in enumerate(s) if counts[c]==1),-1)
