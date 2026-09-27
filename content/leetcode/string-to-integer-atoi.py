class Solution:
    def myAtoi(self, s):
        s = s.lstrip(' ')
        sign, i = 1, 0
        if s and s[0] in '+-':
            sign = -1 if s[0] == '-' else 1
            i = 1
        value = 0
        while i < len(s) and '0' <= s[i] <= '9':
            value = value*10+int(s[i])
            i += 1
        return min(2147483647,max(-2147483648,sign*value))
