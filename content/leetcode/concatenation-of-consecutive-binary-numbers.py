class Solution:
    def concatenatedBinary(self, n):
        result=0;bits=0
        for value in range(1,n+1):
            if value&(value-1)==0:bits+=1
            result=((result<<bits)+value)%1000000007
        return result
