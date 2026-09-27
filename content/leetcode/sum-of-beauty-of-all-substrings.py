class Solution:
    def beautySum(self, s):
        total = 0
        for start in range(len(s)):
            counts = [0] * 26
            for end in range(start, len(s)):
                counts[ord(s[end]) - ord('a')] += 1
                total += self._beauty(counts)
        return total

    def _beauty(self, counts):
        positive = [count for count in counts if count > 0]
        return max(positive) - min(positive)
