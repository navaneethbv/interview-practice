class Solution:
    def isUnique(self, s):
        seen = set()
        for char in s:
            if char in seen:
                return False
            seen.add(char)
        return True
