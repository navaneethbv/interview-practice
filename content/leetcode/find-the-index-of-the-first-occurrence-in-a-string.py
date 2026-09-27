class Solution:
    def strStr(self, haystack, needle):
        if not needle:
            return 0

        prefix_lengths = self._build_prefix_lengths(needle)

        match_length = 0
        for index, character in enumerate(haystack):
            while match_length and character != needle[match_length]:
                match_length = prefix_lengths[match_length - 1]
            if character == needle[match_length]:
                match_length += 1
            if match_length == len(needle):
                return index - len(needle) + 1

        return -1

    @staticmethod
    def _build_prefix_lengths(needle):
        prefix_lengths = [0] * len(needle)
        prefix_end = 0
        for index in range(1, len(needle)):
            while prefix_end and needle[index] != needle[prefix_end]:
                prefix_end = prefix_lengths[prefix_end - 1]
            if needle[index] == needle[prefix_end]:
                prefix_end += 1
            prefix_lengths[index] = prefix_end
        return prefix_lengths
