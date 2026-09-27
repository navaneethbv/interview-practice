class Solution:
    def minRefuelStops(self, target, startFuel, stations):
        import heapq

        available_fuel = []
        reached = startFuel
        station_index = 0
        stops = 0
        while reached < target:
            while station_index < len(stations) and stations[station_index][0] <= reached:
                heapq.heappush(available_fuel, -stations[station_index][1])
                station_index += 1
            if not available_fuel:
                return -1
            reached -= heapq.heappop(available_fuel)
            stops += 1
        return stops
