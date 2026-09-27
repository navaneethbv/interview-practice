class Solution:
    def findTheDifference(self, s, t):
        difference = 0
        for character in s:
            difference ^= ord(character)
        for character in t:
            difference ^= ord(character)
        return chr(difference)
