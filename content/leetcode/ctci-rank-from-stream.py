class StreamRank:
    MAX_VALUE = 100_000

    def __init__(self):
        self.tree = [0] * (self.MAX_VALUE + 2)
        self.counts = [0] * (self.MAX_VALUE + 1)

    def track(self, x):
        self.counts[x] += 1
        position = x + 1
        while position < len(self.tree):
            self.tree[position] += 1
            position += position & -position

    def getRankOfNumber(self, x):
        if self.counts[x] == 0:
            return -1
        total = 0
        position = x + 1
        while position > 0:
            total += self.tree[position]
            position -= position & -position
        return total - 1
