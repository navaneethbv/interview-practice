class Solution:
    def fallingSquares(self,positions):
        placed=[];best=0;result=[]
        for left,side in positions:
            right=left+side;base=max((h for a,b,h in placed if max(a,left)<min(b,right)),default=0)
            height=base+side;placed.append((left,right,height));best=max(best,height);result.append(best)
        return result
