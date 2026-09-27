class Solution:
    def minFlips(self, s):
        n=len(s);mismatch=0;best=n
        for i,c in enumerate(s+s):
            mismatch+=int(c)!=(i%2)
            if i>=n:mismatch-=int(s[i-n])!=((i-n)%2)
            if i>=n-1:best=min(best,mismatch,n-mismatch)
        return best
