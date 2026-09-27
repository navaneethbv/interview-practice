class Solution:
    def hasAlternatingBits(self, n):
        value=n^(n>>1)
        return value&(value+1)==0
