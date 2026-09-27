class Solution:
    def wordPatternMatch(self, pattern, s):
        self.pattern = pattern
        self.text = s
        self.mapping = {}
        self.used_words = set()
        return self._search(0, 0)

    def _search(self, pattern_index, string_index):
        remaining_pattern = len(self.pattern) - pattern_index
        remaining_string = len(self.text) - string_index
        if remaining_string < remaining_pattern:
            return False
        if pattern_index == len(self.pattern):
            return string_index == len(self.text)

        symbol = self.pattern[pattern_index]
        if symbol in self.mapping:
            return self._matches_existing(symbol, pattern_index, string_index)
        return self._try_new_mapping(symbol, pattern_index, string_index)

    def _matches_existing(self, symbol, pattern_index, string_index):
        word = self.mapping[symbol]
        if not self.text.startswith(word, string_index):
            return False
        next_index = string_index + len(word)
        return self._search(pattern_index + 1, next_index)

    def _try_new_mapping(self, symbol, pattern_index, string_index):
        for end in range(string_index + 1, len(self.text) + 1):
            word = self.text[string_index:end]
            if word in self.used_words:
                continue
            self.mapping[symbol] = word
            self.used_words.add(word)
            if self._search(pattern_index + 1, end):
                return True
            self.used_words.remove(word)
            del self.mapping[symbol]
        return False
