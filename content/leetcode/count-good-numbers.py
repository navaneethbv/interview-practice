class Solution:
    def countGoodNumbers(self, n):
        mod=1000000007
        return pow(5,(n+1)//2,mod)*pow(4,n//2,mod)%mod
