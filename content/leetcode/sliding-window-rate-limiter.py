from collections import deque


class SlidingWindowLimiter:
    def __init__(self, limit, window):
        self.limit = limit
        self.window = window
        self.history = {}

    def allow(self, key, timestamp):
        requests = self.history.setdefault(key, deque())
        while requests and requests[0] <= timestamp - self.window:
            requests.popleft()
        if len(requests) >= self.limit:
            return False
        requests.append(timestamp)
        return True
