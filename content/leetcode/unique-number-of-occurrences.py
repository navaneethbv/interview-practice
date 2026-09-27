from collections import Counter
class Solution:
    def uniqueOccurrences(self, arr):
        counts = list(Counter(arr).values())
        return len(counts)==len(set(counts))
