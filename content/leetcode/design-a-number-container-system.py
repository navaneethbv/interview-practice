import heapq


class NumberContainers:
    def __init__(self):
        self.at = {}
        self.indexes = {}

    def change(self, index, number):
        self.at[index] = number
        heapq.heappush(self.indexes.setdefault(number, []), index)

    def find(self, number):
        heap = self.indexes.get(number, [])
        # Skip indexes that have since been given a different number.
        while heap and self.at[heap[0]] != number:
            heapq.heappop(heap)
        return heap[0] if heap else -1
