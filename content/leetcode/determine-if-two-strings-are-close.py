from collections import Counter


class Solution:
    def closeStrings(self, word1, word2):
        first_counts = Counter(word1)
        second_counts = Counter(word2)
        same_characters = first_counts.keys() == second_counts.keys()
        same_frequencies = sorted(first_counts.values()) == sorted(second_counts.values())
        return same_characters and same_frequencies
