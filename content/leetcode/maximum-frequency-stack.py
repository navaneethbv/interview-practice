from collections import Counter, defaultdict


class FreqStack:
    def __init__(self):
        self.frequencies = Counter()
        self.values_by_frequency = defaultdict(list)
        self.maximum_frequency = 0

    def push(self, value):
        frequency = self.frequencies[value] + 1
        self.frequencies[value] = frequency
        self.values_by_frequency[frequency].append(value)
        self.maximum_frequency = max(self.maximum_frequency, frequency)

    def pop(self):
        value = self.values_by_frequency[self.maximum_frequency].pop()
        self.frequencies[value] -= 1
        if not self.values_by_frequency[self.maximum_frequency]:
            self.maximum_frequency -= 1
        return value
