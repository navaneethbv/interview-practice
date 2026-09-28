from collections import Counter
class Solution:
    def longestSubstring(self, s, k):
        if len(s) < k:
            return 0
        counts = Counter(s)
        for character, count in counts.items():
            if count < k:
                return max(self.longestSubstring(part, k) for part in s.split(character))
        return len(s)
