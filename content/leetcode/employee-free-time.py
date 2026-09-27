class Solution:
    def employeeFreeTime(self, schedule):
        intervals = sorted((interval.start, interval.end)
                           for employee in schedule for interval in employee)
        merged_end = intervals[0][1]
        free_intervals = []
        for start, finish in intervals[1:]:
            if start > merged_end:
                free_intervals.append(Interval(merged_end, start))
            merged_end = max(merged_end, finish)
        return free_intervals
