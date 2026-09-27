class Solution:
    def romanToInt(self, s):
        values = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
        total = 0
        for i,c in enumerate(s):
            total += -values[c] if i+1<len(s) and values[c]<values[s[i+1]] else values[c]
        return total
