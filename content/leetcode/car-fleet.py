class Solution:
    def carFleet(self, target, position, speed):
        cars = sorted(zip(position, speed), reverse=True)
        fleets = 0
        slowest = -1
        for start, velocity in cars:
            arrival = (target - start) / velocity
            if arrival > slowest:
                fleets += 1
                slowest = arrival
        return fleets
