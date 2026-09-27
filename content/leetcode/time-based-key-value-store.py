import bisect
class TimeMap:
    def __init__(self): self.history = {}
    def set(self, key, value, timestamp): self.history.setdefault(key,[]).append((timestamp,value))
    def get(self, key, timestamp):
        history = self.history.get(key,[])
        index = bisect.bisect_right(history,(timestamp,chr(127)))-1
        return history[index][1] if index >= 0 else ''
