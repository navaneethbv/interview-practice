class Solution:
    def nthMagicalNumber(self, n, a, b):
        import math
        lcm=a*b//math.gcd(a,b); left,right=min(a,b),n*min(a,b)
        while left<right:
            middle=(left+right)//2
            if middle//a+middle//b-middle//lcm>=n: right=middle
            else: left=middle+1
        return left%1000000007
