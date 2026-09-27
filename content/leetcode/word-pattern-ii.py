class Solution:
    def wordPatternMatch(self, pattern, s):
        mapping = {}
        used_words = set()

        def search(pattern_index, string_index):
            remaining_pattern = len(pattern) - pattern_index
            remaining_string = len(s) - string_index
            if remaining_string < remaining_pattern:
                return False
            if pattern_index == len(pattern):
                return string_index == len(s)

            symbol = pattern[pattern_index]
            if symbol in mapping:
                word = mapping[symbol]
                if not s.startswith(word, string_index):
                    return False
                return search(pattern_index + 1, string_index + len(word))

            for end in range(string_index + 1, len(s) + 1):
                word = s[string_index:end]
                if word in used_words:
                    continue
                mapping[symbol] = word
                used_words.add(word)
                if search(pattern_index + 1, end):
                    return True
                used_words.remove(word)
                del mapping[symbol]
            return False

        return search(0, 0)
