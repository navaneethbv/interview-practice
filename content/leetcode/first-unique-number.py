from collections import Counter, deque


class FirstUnique:
    def __init__(self, nums):
        self.counts = Counter(nums)
        self.queue = deque(nums)

    def showFirstUnique(self):
        self._discard_repeated_prefix()
        return self.queue[0] if self.queue else -1

    def add(self, value):
        self.counts[value] += 1
        self.queue.append(value)

    def _discard_repeated_prefix(self):
        while self.queue and self.counts[self.queue[0]] != 1:
            self.queue.popleft()
