class Solution:
    def knightProbability(self,n,k,row,column):
        dp={(row,column):1.0}
        for _ in range(k):
            nxt={}
            for (r,c),p in dp.items():
                for dr,dc in [(1,2),(1,-2),(-1,2),(-1,-2),(2,1),(2,-1),(-2,1),(-2,-1)]:
                    a,b=r+dr,c+dc
                    if 0<=a<n and 0<=b<n:nxt[a,b]=nxt.get((a,b),0)+p/8
            dp=nxt
        return sum(dp.values())
