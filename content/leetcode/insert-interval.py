class Solution:
    def insert(self, intervals, newInterval):
        result = []
        start, end = newInterval
        placed = False
        for interval_start, interval_end in intervals:
            if interval_end < start:
                result.append([interval_start, interval_end])
            elif interval_start > end:
                if not placed:
                    result.append([start, end])
                    placed = True
                result.append([interval_start, interval_end])
            else:
                start = min(start, interval_start)
                end = max(end, interval_end)
        if not placed:
            result.append([start, end])
        return result
