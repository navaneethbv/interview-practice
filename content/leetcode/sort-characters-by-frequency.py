from collections import Counter
class Solution:
    def frequencySort(self, s):
        counts = Counter(s)
        ordered = sorted(counts.items(), key=lambda item: item[1], reverse=True)
        return ''.join(character * count for character, count in ordered)
