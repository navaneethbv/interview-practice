from collections import defaultdict
class Solution:
    def findRotateSteps(self,ring,key):
        positions=defaultdict(list)
        for i,c in enumerate(ring):positions[c].append(i)
        dp={0:0};n=len(ring)
        for c in key:dp={j:min(cost+min(abs(i-j),n-abs(i-j))+1 for i,cost in dp.items()) for j in positions[c]}
        return min(dp.values())
