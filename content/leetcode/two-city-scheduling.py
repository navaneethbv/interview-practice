class Solution:
    def twoCitySchedCost(self, costs):
        ordered=sorted(costs,key=lambda p:p[0]-p[1]);n=len(costs)//2
        return sum(a if i<n else b for i,(a,b) in enumerate(ordered))
