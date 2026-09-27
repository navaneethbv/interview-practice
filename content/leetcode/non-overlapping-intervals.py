class Solution:
    def eraseOverlapIntervals(self, intervals):
        kept = 0
        end = float('-inf')
        for a,b in sorted(intervals,key=lambda x:x[1]):
            if a >= end:
                end = b
                kept += 1
        return len(intervals) - kept
