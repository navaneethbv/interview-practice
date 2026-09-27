class Solution:
    def divide(self, dividend, divisor):
        negative=(dividend<0)!=(divisor<0);a,b=abs(dividend),abs(divisor);out=0
        for shift in range(31,-1,-1):
            if (b<<shift)<=a:a-=b<<shift;out|=1<<shift
        if negative:out=-out
        return min(2147483647,max(-2147483648,out))
