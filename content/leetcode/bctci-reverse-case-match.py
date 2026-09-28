class Solution:
    def reverseCaseMatch(self, s):
        lower, upper = 0, len(s) - 1
        for _ in range(len(s) // 2):
            while not s[lower].islower():
                lower += 1
            while not s[upper].isupper():
                upper -= 1
            if s[lower] != s[upper].lower():
                return False
            lower += 1
            upper -= 1
        return True
