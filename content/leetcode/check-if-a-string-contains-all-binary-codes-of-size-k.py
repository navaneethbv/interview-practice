class Solution:
    def hasAllCodes(self, s, k):
        if len(s)-k+1<1<<k:return False
        seen=set();value=0;mask=(1<<k)-1
        for i,c in enumerate(s):
            value=((value<<1)|int(c))&mask
            if i>=k-1:seen.add(value)
        return len(seen)==1<<k
