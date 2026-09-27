class Solution:
    def maxDepth(self,s):
        depth=best=0
        for c in s:
            if c=='(':depth+=1;best=max(best,depth)
            elif c==')':depth-=1
        return best
