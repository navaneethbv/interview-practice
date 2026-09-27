from collections import OrderedDict


class Bucket:
    def __init__(self, count):
        self.count = count
        self.keys = OrderedDict()
        self.previous = None
        self.next = None


class AllOne:
    def __init__(self):
        self.head = Bucket(0)
        self.tail = Bucket(0)
        self.head.next = self.tail
        self.tail.previous = self.head
        self.locations = {}

    def _insert_after(self, bucket, count):
        new_bucket = Bucket(count)
        new_bucket.previous = bucket
        new_bucket.next = bucket.next
        bucket.next.previous = new_bucket
        bucket.next = new_bucket
        return new_bucket

    def _remove_if_empty(self, bucket):
        if bucket not in (self.head, self.tail) and not bucket.keys:
            bucket.previous.next = bucket.next
            bucket.next.previous = bucket.previous

    def inc(self, key):
        old_bucket = self.locations.get(key, self.head)
        next_bucket = old_bucket.next
        if next_bucket is self.tail or next_bucket.count != old_bucket.count + 1:
            next_bucket = self._insert_after(old_bucket, old_bucket.count + 1)
        next_bucket.keys[key] = None
        self.locations[key] = next_bucket
        old_bucket.keys.pop(key, None)
        self._remove_if_empty(old_bucket)

    def dec(self, key):
        old_bucket = self.locations[key]
        if old_bucket.count == 1:
            del self.locations[key]
        else:
            previous_bucket = old_bucket.previous
            if previous_bucket is self.head or previous_bucket.count != old_bucket.count - 1:
                previous_bucket = self._insert_after(old_bucket.previous, old_bucket.count - 1)
            previous_bucket.keys[key] = None
            self.locations[key] = previous_bucket
        old_bucket.keys.pop(key, None)
        self._remove_if_empty(old_bucket)

    def getMaxKey(self):
        return next(iter(self.tail.previous.keys), '')

    def getMinKey(self):
        return next(iter(self.head.next.keys), '')
