class Solution:
    def binaryGap(self, n):
        previous=None;best=position=0
        while n:
            if n&1:
                if previous is not None:best=max(best,position-previous)
                previous=position
            n>>=1;position+=1
        return best
