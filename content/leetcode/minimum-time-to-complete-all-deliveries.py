class Solution:
    def minimumTime(self, d, r):
        import math
        lcm=r[0]*r[1]//math.gcd(r[0],r[1]); left,right=0,2*sum(d)
        while left<right:
            middle=(left+right)//2
            if middle-middle//r[0]>=d[0] and middle-middle//r[1]>=d[1] and middle-middle//lcm>=sum(d): right=middle
            else: left=middle+1
        return left
