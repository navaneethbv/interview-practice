class Solution:
    def minimumDeletions(self,s):
        bs=cost=0
        for c in s:
            if c=='b':bs+=1
            else:cost=min(cost+1,bs)
        return cost
