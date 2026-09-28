class Solution:
    def reverseWords(self, s):
        self._reverse_range(s, 0, len(s) - 1)
        start = 0
        for i in range(len(s)+1):
            if i == len(s) or s[i] == " ":
                self._reverse_range(s, start, i - 1)
                start = i + 1

    def _reverse_range(self, characters, left, right):
        while left < right:
            characters[left], characters[right] = characters[right], characters[left]
            left += 1
            right -= 1
