class Buckets:
    def __init__(self):
        self.buckets = [[] for _ in range(8)]
        self.count = 0

    def get(self, key):
        for entry in self.buckets[key % len(self.buckets)]:
            if entry[0] == key:
                return entry[1]
        return []

    def put(self, key, values):
        self.remove(key)
        self.buckets[key % len(self.buckets)].append((key, values))
        self.count += 1
        if self.count > 2 * len(self.buckets):
            old = self.buckets
            self.buckets = [[] for _ in range(2 * len(old))]
            for bucket in old:
                for entry in bucket:
                    self.buckets[entry[0] % len(self.buckets)].append(entry)

    def remove(self, key):
        bucket = self.buckets[key % len(self.buckets)]
        for index, entry in enumerate(bucket):
            if entry[0] == key:
                bucket.pop(index)
                self.count -= 1
                return

    def keys(self):
        return sorted(entry[0] for bucket in self.buckets for entry in bucket)

class Multiset:
    def __init__(self):
        self.table = Buckets()
        self.total = 0

    def add(self, key):
        values = self.table.get(key)
        values.append(1)
        self.table.put(key, values)
        self.total += 1

    def remove(self, key):
        values = self.table.get(key)
        if values:
            values.pop()
            self.total -= 1
            if not values:
                self.table.remove(key)

    def contains(self, key):
        return bool(self.table.get(key))

    def size(self):
        return self.total
