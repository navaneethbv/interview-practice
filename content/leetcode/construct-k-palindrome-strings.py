class Solution:
    def canConstruct(self, s, k):
        from collections import Counter

        odd_count = sum(count % 2 for count in Counter(s).values())
        return odd_count <= k <= len(s)
