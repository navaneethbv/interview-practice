class Solution:
    def indexOf(self, s, t):
        for start in range(len(s) - len(t) + 1):
            if all(s[start + offset] == t[offset] for offset in range(len(t))):
                return start
        return -1
