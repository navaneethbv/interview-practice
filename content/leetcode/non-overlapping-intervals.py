class Solution:
    def eraseOverlapIntervals(self, intervals):
        kept = 0
        end = float('-inf')
        for start, finish in sorted(intervals, key=lambda interval: interval[1]):
            if start >= end:
                end = finish
                kept += 1
        return len(intervals) - kept
