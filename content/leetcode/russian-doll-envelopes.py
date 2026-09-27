from bisect import bisect_left
class Solution:
    def maxEnvelopes(self, envelopes):
        tails=[]
        for width,height in sorted(envelopes,key=lambda p:(p[0],-p[1])):
            i=bisect_left(tails,height)
            if i==len(tails):tails.append(height)
            else:tails[i]=height
        return len(tails)
