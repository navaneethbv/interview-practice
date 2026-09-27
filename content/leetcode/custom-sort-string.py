from collections import Counter


class Solution:
    def customSortString(self, order, s):
        counts = Counter(s)
        parts = []
        for character in order:
            parts.append(character * counts.pop(character, 0))
        for character, count in counts.items():
            parts.append(character * count)
        return ''.join(parts)
