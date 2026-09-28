from collections import deque


class ViewerCounter:
    def __init__(self, window):
        self.window = window
        self.joins = {}

    def join(self, t, v):
        self.joins.setdefault(v, deque()).append(t)

    def get_viewers(self, t, v):
        times = self.joins.setdefault(v, deque())
        while times and times[0] < t - self.window:
            times.popleft()
        return len(times)
