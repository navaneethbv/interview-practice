class Solution:
    def maxDistance(self,position,m):
        position=sorted(position)
        def possible(gap):
            used=1;last=position[0]
            for p in position[1:]:
                if p-last>=gap:used+=1;last=p
            return used>=m
        lo,hi=1,position[-1]-position[0]
        while lo<hi:
            mid=(lo+hi+1)//2
            if possible(mid):lo=mid
            else:hi=mid-1
        return lo
