class Solution:
    def findRadius(self, houses: list[int], heaters: list[int]) -> int:
        houses.sort()
        heaters.sort()
        heater = 0
        radius = 0
        for house in houses:
            while heater + 1 < len(heaters) and abs(heaters[heater + 1] - house) <= abs(heaters[heater] - house):
                heater += 1
            radius = max(radius, abs(heaters[heater] - house))
        return radius
