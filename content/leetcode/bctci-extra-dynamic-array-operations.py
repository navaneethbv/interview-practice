class DynamicArrayExtras:
    def __init__(self):
        self.values = [0]
        self.length = 0

    def append(self, x):
        self.insert(self.length, x)

    def get(self, i):
        return self.values[i]

    def set(self, i, x):
        self.values[i] = x

    def size(self):
        return self.length

    def pop_back(self):
        self.length -= 1

    def pop(self, i):
        removed = self.values[i]
        for index in range(i, self.length - 1):
            self.values[index] = self.values[index + 1]
        self.length -= 1
        return removed

    def contains(self, x):
        return any(self.values[index] == x for index in range(self.length))

    def insert(self, i, x):
        if self.length == len(self.values):
            grown = [0] * (2 * len(self.values))
            for index in range(self.length):
                grown[index] = self.values[index]
            self.values = grown
        for index in range(self.length, i, -1):
            self.values[index] = self.values[index - 1]
        self.values[i] = x
        self.length += 1

    def remove(self, x):
        for index in range(self.length):
            if self.values[index] == x:
                self.pop(index)
                return index
        return -1
