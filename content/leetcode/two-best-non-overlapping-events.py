class Solution:
    def maxTwoEvents(self, events):
        import bisect
        events.sort(); starts=[e[0] for e in events]; suffix=[0]*(len(events)+1)
        for i in range(len(events)-1,-1,-1): suffix[i]=max(suffix[i+1],events[i][2])
        return max(value+suffix[bisect.bisect_right(starts,end)] for start,end,value in events)
