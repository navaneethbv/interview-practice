class Solution:
    def numDecodings(self, s):
        older, previous = 1, int(s[0] != '0')
        for i in range(1, len(s)):
            current = previous if s[i] != '0' else 0
            if 10 <= int(s[i-1:i+1]) <= 26:
                current += older
            older, previous = previous, current
        return previous
