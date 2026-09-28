import heapq


class TopSongs:
    def __init__(self, k):
        self.k = k
        self.totals = {}
        self.heap = []

    def register_plays(self, title, plays):
        self.totals[title] = self.totals.get(title, 0) + plays
        heapq.heappush(self.heap, (-self.totals[title], title))

    def top_k(self):
        result, kept = [], []
        while self.heap and len(result) < self.k:
            entry = heapq.heappop(self.heap)
            if -entry[0] == self.totals[entry[1]] and entry[1] not in result:
                result.append(entry[1])
                kept.append(entry)
        for entry in kept:
            heapq.heappush(self.heap, entry)
        return result
