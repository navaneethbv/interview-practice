class Solution:
    def minimumLengthEncoding(self, words):
        remaining_words = set(words)
        for word in words:
            for suffix_start in range(1, len(word)):
                remaining_words.discard(word[suffix_start:])
        return sum(len(word) + 1 for word in remaining_words)
