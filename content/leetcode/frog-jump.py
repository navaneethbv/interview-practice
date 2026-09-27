class Solution:
    def canCross(self, stones):
        jumps={position:set() for position in stones};jumps[0].add(0)
        for position in stones:
            for last in jumps[position]:
                for distance in (last-1,last,last+1):
                    if distance>0 and position+distance in jumps:jumps[position+distance].add(distance)
        return bool(jumps[stones[-1]])
