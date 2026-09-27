from math import isqrt
class Solution:
    def judgeSquareSum(self,c):
        a,b=0,isqrt(c)
        while a<=b:
            total=a*a+b*b
            if total==c:return True
            if total<c:a+=1
            else:b-=1
        return False
