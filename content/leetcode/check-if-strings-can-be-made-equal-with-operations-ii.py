class Solution:
    def checkStrings(self, s1, s2):
        return self._counts_by_parity(s1) == self._counts_by_parity(s2)

    def _counts_by_parity(self, value):
        counts = [[0] * 26 for _ in range(2)]
        for index, character in enumerate(value):
            counts[index % 2][ord(character) - ord('a')] += 1
        return counts
