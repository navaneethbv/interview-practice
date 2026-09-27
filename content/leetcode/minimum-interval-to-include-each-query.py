import heapq

class Solution:
    def minInterval(self, intervals, queries):
        intervals.sort()
        answers = [-1] * len(queries)
        active_intervals = []
        interval_index = 0
        ordered_queries = sorted(
            (query, index)
            for index, query in enumerate(queries)
        )

        for query, original_index in ordered_queries:
            while (
                interval_index < len(intervals)
                and intervals[interval_index][0] <= query
            ):
                left, right = intervals[interval_index]
                interval_size = right - left + 1
                heapq.heappush(active_intervals, (interval_size, right))
                interval_index += 1

            while active_intervals and active_intervals[0][1] < query:
                heapq.heappop(active_intervals)
            if active_intervals:
                answers[original_index] = active_intervals[0][0]
        return answers
