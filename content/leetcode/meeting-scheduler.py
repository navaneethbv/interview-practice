class Solution:
    def minAvailableDuration(self,slots1,slots2,duration):
        a,b=sorted(slots1),sorted(slots2);i=j=0
        while i<len(a) and j<len(b):
            lo,hi=max(a[i][0],b[j][0]),min(a[i][1],b[j][1])
            if hi-lo>=duration:return [lo,lo+duration]
            if a[i][1]<b[j][1]:i+=1
            else:j+=1
        return []
