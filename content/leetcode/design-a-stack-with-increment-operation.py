class CustomStack:
    def __init__(self, maxSize):
        self.capacity = maxSize
        self.values = []
        self.pending = []

    def push(self, x):
        if len(self.values) >= self.capacity:
            return
        self.values.append(x)
        self.pending.append(0)

    def pop(self):
        if not self.values:
            return -1
        extra = self.pending.pop()
        result = self.values.pop() + extra
        if self.pending:
            self.pending[-1] += extra
        return result

    def increment(self, k, val):
        if self.values:
            bottom_index = min(k, len(self.values)) - 1
            self.pending[bottom_index] += val
