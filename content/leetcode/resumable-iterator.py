import bisect


class ResumableIterator:
    def __init__(self, files):
        self.files = files
        # starts[i] is the global position of the first value of file i.
        self.starts = []
        total = 0
        for f in files:
            self.starts.append(total)
            total += len(f)
        self.total = total
        self.position = 0

    def hasNext(self):
        return self.position < self.total

    def next(self):
        file = bisect.bisect_right(self.starts, self.position) - 1
        while len(self.files[file]) == 0 or self.position - self.starts[file] >= len(self.files[file]):
            file += 1
        value = self.files[file][self.position - self.starts[file]]
        self.position += 1
        return value

    def getState(self):
        return self.position

    def setState(self, state):
        self.position = state
