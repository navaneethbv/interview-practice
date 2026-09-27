class Solution:
    def trailingZeroes(self, n):
        result=0
        while n: n//=5; result+=n
        return result
