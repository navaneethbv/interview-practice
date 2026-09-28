class Solution:
    def doesMatch(self, pattern, value):
        if not pattern:
            return not value
        main, alternate = pattern[0], "b" if pattern[0] == "a" else "a"
        main_count = pattern.count(main)
        alternate_count = len(pattern) - main_count
        first_alternate = pattern.find(alternate)
        for main_length in range(1, len(value) // main_count + 1):
            remaining = len(value) - main_length * main_count
            if alternate_count == 0:
                if remaining == 0 and self._matches(pattern, value, main_length, 0, 0):
                    return True
                continue
            if remaining <= 0 or remaining % alternate_count:
                continue
            alternate_length = remaining // alternate_count
            alternate_start = first_alternate * main_length
            if self._matches(pattern, value, main_length, alternate_start, alternate_length):
                return True
        return False

    def _matches(self, pattern, value, main_length, alternate_start, alternate_length):
        main_word = value[:main_length]
        alternate_word = value[alternate_start:alternate_start + alternate_length]
        parts = [main_word if letter == pattern[0] else alternate_word for letter in pattern]
        return "".join(parts) == value
