from collections import deque


class CircuitBreaker:
    def __init__(self, threshold, window, cooldown):
        self.threshold = threshold
        self.window = window
        self.cooldown = cooldown
        self.failures = deque()
        self.open_until = None

    def call(self, timestamp, success):
        if self.open_until is not None:
            if timestamp < self.open_until:
                return False
            self.failures.clear()
            self.open_until = None
        while self.failures and self.failures[0] <= timestamp - self.window:
            self.failures.popleft()
        if not success:
            self.failures.append(timestamp)
            if len(self.failures) >= self.threshold:
                self.open_until = timestamp + self.cooldown
        return True
