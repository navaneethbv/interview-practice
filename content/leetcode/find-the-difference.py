class Solution:
    def findTheDifference(self, s, t):
        value=0
        for c in s+t:value^=ord(c)
        return chr(value)
