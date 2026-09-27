class MyHashMap:
    BUCKET_COUNT = 1009

    def __init__(self):
        self.buckets = [[] for _ in range(self.BUCKET_COUNT)]

    def put(self, key, value):
        bucket = self.buckets[key % self.BUCKET_COUNT]
        for pair in bucket:
            if pair[0] == key:
                pair[1] = value
                return
        bucket.append([key, value])

    def get(self, key):
        for stored_key, value in self.buckets[key % self.BUCKET_COUNT]:
            if stored_key == key:
                return value
        return -1

    def remove(self, key):
        bucket = self.buckets[key % self.BUCKET_COUNT]
        for index, pair in enumerate(bucket):
            if pair[0] == key:
                bucket.pop(index)
                return
