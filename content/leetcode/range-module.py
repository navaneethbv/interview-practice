class RangeModule:
    def __init__(self):
        self.ranges = []

    def addRange(self, left, right):
        merged = []
        for start, end in self.ranges:
            if end < left:
                merged.append((start, end))
            elif start > right:
                merged.append((left, right))
                left, right = start, end
            else:
                left = min(left, start)
                right = max(right, end)
        merged.append((left, right))
        self.ranges = merged

    def queryRange(self, left, right):
        return any(start <= left and right <= end for start, end in self.ranges)

    def removeRange(self, left, right):
        remaining = []
        for start, end in self.ranges:
            if end <= left or start >= right:
                remaining.append((start, end))
                continue
            if start < left:
                remaining.append((start, left))
            if end > right:
                remaining.append((right, end))
        self.ranges = remaining
