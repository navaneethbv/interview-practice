class DynamicArray:
    def __init__(self):
        self.capacity = 1
        self.length = 0
        self.values = [None] * self.capacity

    def append(self, x):
        if self.length == self.capacity:
            self._resize(self.capacity * 2)
        self.values[self.length] = x
        self.length += 1

    def get(self, i):
        return self.values[i]

    def set(self, i, x):
        self.values[i] = x

    def size(self):
        return self.length

    def pop_back(self):
        self.length -= 1
        if self.capacity > 1 and self.length <= self.capacity // 4:
            self._resize(self.capacity // 2)

    def _resize(self, capacity):
        values = [None] * capacity
        for index in range(self.length):
            values[index] = self.values[index]
        self.values = values
        self.capacity = capacity
