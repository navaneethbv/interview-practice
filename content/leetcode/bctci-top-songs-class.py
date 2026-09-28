import heapq


class Ranked:
    def __init__(self, plays, title):
        self.plays = plays
        self.title = title

    def __lt__(self, other):
        if self.plays != other.plays:
            return self.plays < other.plays
        return self.title > other.title


class TopSongs:
    def __init__(self, k):
        self.k = k
        self.heap = []

    def register_plays(self, title, plays):
        entry = Ranked(plays, title)
        if len(self.heap) < self.k:
            heapq.heappush(self.heap, entry)
        elif self.heap[0] < entry:
            heapq.heapreplace(self.heap, entry)

    def top_k(self):
        ranked = sorted(self.heap, key=lambda entry: (-entry.plays, entry.title))
        return [entry.title for entry in ranked]
