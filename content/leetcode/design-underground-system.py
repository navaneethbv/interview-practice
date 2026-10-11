class UndergroundSystem:
    def __init__(self):
        self.active = {}
        self.routes = {}

    def checkIn(self, id, stationName, t):
        self.active[id] = (stationName, t)

    def checkOut(self, id, stationName, t):
        start, started = self.active.pop(id)
        total, count = self.routes.get((start, stationName), (0, 0))
        self.routes[(start, stationName)] = (total + t - started, count + 1)

    def getAverageTime(self, startStation, endStation):
        total, count = self.routes[(startStation, endStation)]
        return total / count
