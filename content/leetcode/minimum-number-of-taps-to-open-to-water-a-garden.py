class Solution:
    def minTaps(self, n, ranges):
        reach=[0]*(n+1)
        for i,radius in enumerate(ranges):
            left=max(0,i-radius); reach[left]=max(reach[left],min(n,i+radius))
        used=end=farthest=0
        for position in range(n):
            farthest=max(farthest,reach[position])
            if position==end:
                if farthest<=position: return -1
                used+=1; end=farthest
        return used
