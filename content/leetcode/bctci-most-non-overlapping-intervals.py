class Solution:
    def maxNonOverlapping(self, intervals):
        chosen = 0
        last_end = -1
        for start, end in sorted(intervals, key=lambda interval: interval[1]):
            if start > last_end:
                chosen += 1
                last_end = end
        return chosen
