from collections import deque

class MaxQueue:
    def __init__(self):
        self.queue = deque()
        self.maximums = deque()

    def push(self, value):
        self.queue.append(value)
        while self.maximums and self.maximums[-1] < value:
            self.maximums.pop()
        self.maximums.append(value)

    def pop(self):
        value = self.queue.popleft()
        if value == self.maximums[0]:
            self.maximums.popleft()
        return value

    def peek(self):
        return self.queue[0]

    def max(self):
        return self.maximums[0]

    def size(self):
        return len(self.queue)
