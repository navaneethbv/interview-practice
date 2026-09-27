class Solution:
    def isOneEditDistance(self, s, t):
        if len(s) > len(t):
            s, t = t, s
        if len(t) - len(s) > 1:
            return False
        for index, character in enumerate(s):
            if character != t[index]:
                if len(s) == len(t):
                    return s[index + 1:] == t[index + 1:]
                return s[index:] == t[index + 1:]
        return len(t) == len(s) + 1
