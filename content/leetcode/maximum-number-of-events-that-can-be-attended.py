class Solution:
    def maxEvents(self, events):
        import heapq
        events.sort()
        end_days = []
        index = 0
        day = 0
        attended = 0
        while index < len(events) or end_days:
            if not end_days:
                day = max(day, events[index][0])
            while index < len(events) and events[index][0] <= day:
                heapq.heappush(end_days, events[index][1])
                index += 1
            while end_days and end_days[0] < day:
                heapq.heappop(end_days)
            if end_days:
                heapq.heappop(end_days)
                attended += 1
            day += 1
        return attended
