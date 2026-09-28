from collections import Counter


class Solution:
    def takeCharacters(self, s, k):
        remaining = Counter(s)
        if any(remaining[character] < k for character in 'abc'):
            return -1
        left = 0
        longest_middle = 0
        for right, character in enumerate(s):
            remaining[character] -= 1
            while remaining[character] < k:
                remaining[s[left]] += 1
                left += 1
            longest_middle = max(longest_middle, right - left + 1)
        return len(s) - longest_middle
