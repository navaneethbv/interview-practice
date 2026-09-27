class SnapshotArray:
    def __init__(self, length):
        self.history = [[(0, 0)] for _ in range(length)]
        self.version = 0

    def set(self, index, val):
        entries = self.history[index]
        if entries[-1][0] == self.version:
            entries[-1] = (self.version, val)
        else:
            entries.append((self.version, val))

    def snap(self):
        saved_version = self.version
        self.version += 1
        return saved_version

    def get(self, index, snap_id):
        entries = self.history[index]
        left = 0
        right = len(entries)
        while left < right:
            middle = (left + right) // 2
            if entries[middle][0] <= snap_id:
                left = middle + 1
            else:
                right = middle
        return entries[left - 1][1]
