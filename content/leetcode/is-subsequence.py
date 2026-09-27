class Solution:
    def isSubsequence(self, s, t):
        source_index = 0
        for character in t:
            if source_index < len(s) and s[source_index] == character:
                source_index += 1
        return source_index == len(s)
