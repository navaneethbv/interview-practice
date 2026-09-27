class Solution:
    def hIndex(self,citations):
        best=0
        for i,value in enumerate(sorted(citations,reverse=True),1):
            if value>=i:best=i
        return best
