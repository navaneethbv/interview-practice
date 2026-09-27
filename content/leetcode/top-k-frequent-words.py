from collections import Counter
class Solution:
    def topKFrequent(self, words, k):
        counts = Counter(words)
        ordered_words = sorted(counts, key=lambda word: (-counts[word], word))
        return ordered_words[:k]
