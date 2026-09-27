class Solution:
    def numDecodings(self, s):
        older, previous = 1, int(s[0] != '0')
        for index in range(1, len(s)):
            current = previous if s[index] != '0' else 0
            if 10 <= int(s[index - 1:index + 1]) <= 26:
                current += older
            older, previous = previous, current
        return previous
