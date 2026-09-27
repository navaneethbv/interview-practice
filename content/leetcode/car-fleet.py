class Solution:
    def carFleet(self, target, position, speed):
        fleets = 0
        slowest = -1
        for p,s in sorted(zip(position,speed),reverse=True):
            arrival = (target-p)/s
            if arrival > slowest:
                fleets += 1; slowest = arrival
        return fleets
