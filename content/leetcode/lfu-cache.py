from collections import defaultdict, OrderedDict
class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.values = {}
        self.frequencies = {}
        self.groups = defaultdict(OrderedDict)
        self.minimum_frequency = 0

    def _touch(self, key):
        old_frequency = self.frequencies[key]
        del self.groups[old_frequency][key]
        if not self.groups[old_frequency]:
            del self.groups[old_frequency]
            if old_frequency == self.minimum_frequency:
                self.minimum_frequency += 1
        new_frequency = old_frequency + 1
        self.frequencies[key] = new_frequency
        self.groups[new_frequency][key] = None

    def get(self, key):
        if key not in self.values:
            return -1
        self._touch(key)
        return self.values[key]

    def put(self, key, value):
        if self.capacity == 0:
            return
        if key in self.values:
            self.values[key] = value
            self._touch(key)
            return
        if len(self.values)==self.capacity:
            old, _ = self.groups[self.minimum_frequency].popitem(last=False)
            if not self.groups[self.minimum_frequency]:
                del self.groups[self.minimum_frequency]
            del self.values[old]
            del self.frequencies[old]
        self.values[key] = value
        self.frequencies[key] = 1
        self.groups[1][key] = None
        self.minimum_frequency = 1
