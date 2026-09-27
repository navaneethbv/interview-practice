class Solution:
    def minCost(self, costs):
        best=[0,0,0]
        for row in costs: best=[row[c]+min(best[other] for other in range(3) if other!=c) for c in range(3)]
        return min(best)
