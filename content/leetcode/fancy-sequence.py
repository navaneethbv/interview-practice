class Fancy:
    MOD = 1_000_000_007

    def __init__(self):
        self.values = []
        self.multiplier = 1
        self.increment = 0

    def append(self, value):
        normalized = (value - self.increment) * pow(
            self.multiplier, self.MOD - 2, self.MOD
        ) % self.MOD
        self.values.append(normalized)

    def addAll(self, increment):
        self.increment = (self.increment + increment) % self.MOD

    def multAll(self, multiplier):
        self.multiplier = self.multiplier * multiplier % self.MOD
        self.increment = self.increment * multiplier % self.MOD

    def getIndex(self, index):
        if index >= len(self.values):
            return -1
        return (self.values[index] * self.multiplier + self.increment) % self.MOD
