from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity): self.capacity,self.cache = capacity,OrderedDict()
    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key, value):
        self.cache[key] = value; self.cache.move_to_end(key)
        if len(self.cache)>self.capacity: self.cache.popitem(last=False)
