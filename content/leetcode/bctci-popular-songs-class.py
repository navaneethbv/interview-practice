import heapq


class PopularSongs:
    def __init__(self):
        self.plays = {}
        self.lower = []
        self.upper = []

    def register_plays(self, title, plays):
        self.plays[title] = plays
        heapq.heappush(self.lower, -plays)
        heapq.heappush(self.upper, -heapq.heappop(self.lower))
        if len(self.upper) > len(self.lower):
            heapq.heappush(self.lower, -heapq.heappop(self.upper))

    def is_popular(self, title):
        if len(self.lower) > len(self.upper):
            doubled_median = -2 * self.lower[0]
        else:
            doubled_median = -self.lower[0] + self.upper[0]
        return 2 * self.plays[title] > doubled_median
