from collections import deque


class MovingAverage:
    def __init__(self, size):
        self.size = size
        self.values = deque()
        self.total = 0

    def next(self, val):
        self.values.append(val)
        self.total += val

        if len(self.values) > self.size:
            self.total -= self.values.popleft()

        return self.total / len(self.values)
