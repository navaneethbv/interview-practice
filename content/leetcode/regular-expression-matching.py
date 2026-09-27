class Solution:
    def isMatch(self, s, p):
        matches = [
            [False] * (len(p) + 1)
            for _ in range(len(s) + 1)
        ]
        matches[0][0] = True

        for pattern_index in range(2, len(p) + 1):
            if p[pattern_index - 1] == "*":
                matches[0][pattern_index] = matches[0][pattern_index - 2]

        for string_index in range(1, len(s) + 1):
            for pattern_index in range(1, len(p) + 1):
                matches[string_index][pattern_index] = self._match_cell(
                    s, p, matches, string_index, pattern_index
                )
        return matches[-1][-1]

    @staticmethod
    def _match_cell(s, p, matches, string_index, pattern_index):
        pattern_character = p[pattern_index - 1]
        if pattern_character == "*":
            skip_pattern = matches[string_index][pattern_index - 2]
            repeats_character = p[pattern_index - 2]
            consumes_character = (
                repeats_character == "."
                or repeats_character == s[string_index - 1]
            )
            return skip_pattern or (
                consumes_character
                and matches[string_index - 1][pattern_index]
            )

        same_character = (
            pattern_character == "."
            or pattern_character == s[string_index - 1]
        )
        return same_character and matches[string_index - 1][pattern_index - 1]
