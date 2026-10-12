class TTLStore:
    def __init__(self):
        self.entries = {}

    def put(self, key, value, ttl, timestamp):
        self.entries[key] = (value, timestamp + ttl)

    def get(self, key, timestamp):
        entry = self.entries.get(key)
        if entry is None:
            return []
        value, expires = entry
        if timestamp >= expires:
            del self.entries[key]
            return []
        return [value]

    def remove(self, key, timestamp):
        if not self.get(key, timestamp):
            return False
        del self.entries[key]
        return True
