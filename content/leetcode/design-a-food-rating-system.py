import heapq


class FoodRatings:
    def __init__(self, foods, cuisines, ratings):
        self.rating = dict(zip(foods, ratings))
        self.cuisine = dict(zip(foods, cuisines))
        self.heaps = {}
        for food, cuisine, rating in zip(foods, cuisines, ratings):
            heapq.heappush(self.heaps.setdefault(cuisine, []), (-rating, food))

    def changeRating(self, food, newRating):
        self.rating[food] = newRating
        heapq.heappush(self.heaps[self.cuisine[food]], (-newRating, food))

    def highestRated(self, cuisine):
        heap = self.heaps[cuisine]
        # Discard stale entries whose rating has since changed.
        while -heap[0][0] != self.rating[heap[0][1]]:
            heapq.heappop(heap)
        return heap[0][1]
