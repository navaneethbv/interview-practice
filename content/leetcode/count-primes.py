class Solution:
    def countPrimes(self, n):
        if n<3:return 0
        prime=bytearray(b'\x01')*n;prime[0]=prime[1]=0
        for p in range(2,int(n**0.5)+1):
            if prime[p]:
                start=p*p
                if start<n:prime[start:n:p]=b'\x00'*((n-1-start)//p+1)
        return sum(prime)
