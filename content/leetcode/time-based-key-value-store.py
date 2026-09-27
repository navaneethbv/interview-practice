class TimeMap:
    def __init__(self):
        self.history = {}

    def set(self, key, value, timestamp):
        self.history.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        entries = self.history.get(key, [])
        left = 0
        right = len(entries)
        while left < right:
            middle = left + (right - left) // 2
            if entries[middle][0] <= timestamp:
                left = middle + 1
            else:
                right = middle
        return entries[left - 1][1] if left else ""
