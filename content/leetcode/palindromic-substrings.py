class Solution:
    def countSubstrings(self, s):
        total = 0
        for center in range(len(s)):
            total += self._count_from_center(s, center, center)
            total += self._count_from_center(s, center, center + 1)
        return total

    def _count_from_center(self, s, left, right):
        count = 0
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1
        return count
