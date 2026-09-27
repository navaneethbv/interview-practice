from collections import Counter


class Solution:
    def minWindow(self, s, t):
        need = Counter(t)
        missing = len(t)
        left = 0
        best = None
        for right, character in enumerate(s):
            if need[character] > 0:
                missing -= 1
            need[character] -= 1
            while missing == 0:
                if best is None or right - left + 1 < best[1] - best[0]:
                    best = (left, right + 1)
                need[s[left]] += 1
                if need[s[left]] > 0:
                    missing += 1
                left += 1
        return '' if best is None else s[best[0]:best[1]]
