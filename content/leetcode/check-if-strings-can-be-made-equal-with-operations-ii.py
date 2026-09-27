class Solution:
    def checkStrings(self, s1, s2):
        return sorted(s1[::2]) == sorted(s2[::2]) and sorted(s1[1::2]) == sorted(s2[1::2])
