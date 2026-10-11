import heapq


class StockPrice:
    def __init__(self):
        self.prices = {}
        self.latest = 0
        self.high = []
        self.low = []

    def update(self, timestamp, price):
        self.prices[timestamp] = price
        self.latest = max(self.latest, timestamp)
        heapq.heappush(self.high, (-price, timestamp))
        heapq.heappush(self.low, (price, timestamp))

    def current(self):
        return self.prices[self.latest]

    def maximum(self):
        # Entries whose timestamp has since been corrected are stale; skip them.
        while self.prices[self.high[0][1]] != -self.high[0][0]:
            heapq.heappop(self.high)
        return -self.high[0][0]

    def minimum(self):
        while self.prices[self.low[0][1]] != self.low[0][0]:
            heapq.heappop(self.low)
        return self.low[0][0]
