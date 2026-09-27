class Solution:
    def wordPattern(self, pattern, s):
        words = s.split()
        if len(words) != len(pattern):
            return False

        pattern_to_word = {}
        word_to_pattern = {}
        for symbol, word in zip(pattern, words):
            if symbol in pattern_to_word and pattern_to_word[symbol] != word:
                return False
            if word in word_to_pattern and word_to_pattern[word] != symbol:
                return False
            pattern_to_word[symbol] = word
            word_to_pattern[word] = symbol
        return True
