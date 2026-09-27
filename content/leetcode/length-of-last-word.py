class Solution:
    def lengthOfLastWord(self, s):
        index = len(s) - 1
        while index >= 0 and s[index] == " ":
            index -= 1
        length = 0
        while index >= 0 and s[index] != " ":
            length += 1
            index -= 1
        return length
