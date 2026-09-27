class Solution:
    def nearestPalindromic(self,n):
        length=len(n);value=int(n);prefix=int(n[:(length+1)//2]);candidates={10**(length-1)-1,10**length+1}
        for p in (prefix-1,prefix,prefix+1):
            if p<0:continue
            s=str(p);candidates.add(int(s+(s[:-1] if length%2 else s)[::-1]))
        candidates.discard(value)
        return str(min(candidates,key=lambda x:(abs(x-value),x)))
