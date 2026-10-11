import heapq


class SeatManager:
    def __init__(self, n):
        self.freed = []
        self.next = 1

    def reserve(self):
        if self.freed:
            return heapq.heappop(self.freed)
        self.next += 1
        return self.next - 1

    def unreserve(self, seatNumber):
        heapq.heappush(self.freed, seatNumber)
