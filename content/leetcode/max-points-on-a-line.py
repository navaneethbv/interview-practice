from collections import Counter
from math import gcd
class Solution:
    def maxPoints(self, points):
        best=1
        for i,(x,y) in enumerate(points):
            counts=Counter()
            for a,b in points[i+1:]:
                dx,dy=a-x,b-y;g=gcd(dx,dy);dx//=g;dy//=g
                if dx<0 or (dx==0 and dy<0):dx,dy=-dx,-dy
                counts[(dx,dy)]+=1;best=max(best,counts[(dx,dy)]+1)
        return best
