class Solution:
    def canConstruct(self, s, k):
        from collections import Counter
        return sum(count%2 for count in Counter(s).values())<=k<=len(s)
