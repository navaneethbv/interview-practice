from collections import Counter


class Solution:
    def sortByFrequency(self, word):
        counts = Counter(word)
        return sorted(counts, key=lambda letter: (-counts[letter], letter))
