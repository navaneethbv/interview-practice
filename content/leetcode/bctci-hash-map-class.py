class Buckets:
    def __init__(self):
        self.chains = [[] for _ in range(8)]
        self.count = 0

    def get(self, key):
        for entry in self.chains[key % len(self.chains)]:
            if entry[0] == key:
                return entry[1]
        return []

    def put(self, key, values):
        self.remove(key)
        self.chains[key % len(self.chains)].append((key, values))
        self.count += 1
        if self.count > 2 * len(self.chains):
            old = self.chains
            self.chains = [[] for _ in range(2 * len(old))]
            for bucket in old:
                for entry in bucket:
                    self.chains[entry[0] % len(self.chains)].append(entry)

    def remove(self, key):
        bucket = self.chains[key % len(self.chains)]
        for index, entry in enumerate(bucket):
            if entry[0] == key:
                bucket.pop(index)
                self.count -= 1
                return

    def keys(self):
        return sorted(entry[0] for bucket in self.chains for entry in bucket)

class HashMapClass:
    def __init__(self):
        self.table = Buckets()
        self.total = 0

    def add(self, key, value):
        self.table.put(key, [value])

    def remove(self, key):
        self.table.remove(key)

    def contains(self, key):
        return bool(self.table.get(key))

    def size(self):
        return self.table.count

    def get(self, key):
        return list(self.table.get(key))
