from bisect import bisect_right
class Solution:
    def jobScheduling(self, startTime, endTime, profit):
        jobs = sorted(zip(endTime,startTime,profit))
        ends, best = [], [0]
        for end,start,pay in jobs:
            index = bisect_right(ends,start)
            best.append(max(best[-1],best[index]+pay))
            ends.append(end)
        return best[-1]
