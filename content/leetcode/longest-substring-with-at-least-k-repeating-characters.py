from collections import Counter
class Solution:
    def longestSubstring(self, s, k):
        if len(s)<k:return 0
        counts=Counter(s)
        for c,n in counts.items():
            if n<k:return max(self.longestSubstring(part,k) for part in s.split(c))
        return len(s)
