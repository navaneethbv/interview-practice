from collections import Counter
class Solution:
    def topKFrequent(self, words, k):
        counts=Counter(words)
        return sorted(counts,key=lambda word:(-counts[word],word))[:k]
