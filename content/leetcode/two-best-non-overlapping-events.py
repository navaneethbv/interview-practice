class Solution:
    def maxTwoEvents(self, events):
        import bisect
        events.sort()
        starts = [event[0] for event in events]
        suffix_best = [0] * (len(events) + 1)
        for index in range(len(events) - 1, -1, -1):
            suffix_best[index] = max(suffix_best[index + 1], events[index][2])
        best = 0
        for start, end, value in events:
            next_index = bisect.bisect_right(starts, end)
            best = max(best, value + suffix_best[next_index])
        return best
