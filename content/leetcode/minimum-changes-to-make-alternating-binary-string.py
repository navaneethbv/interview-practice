class Solution:
    def minOperations(self,s):
        mismatch=sum(int(c)!=i%2 for i,c in enumerate(s));return min(mismatch,len(s)-mismatch)
