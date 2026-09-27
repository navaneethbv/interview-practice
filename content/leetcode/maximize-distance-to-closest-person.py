class Solution:
    def maxDistToClosest(self,seats):
        occupied=[i for i,v in enumerate(seats) if v]
        best=max(occupied[0],len(seats)-1-occupied[-1])
        for a,b in zip(occupied,occupied[1:]):best=max(best,(b-a)//2)
        return best
