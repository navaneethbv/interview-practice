class Solution:
    def minSpeedOnTime(self, dist, hour):
        if hour <= len(dist) - 1:
            return -1
        def can_arrive(speed):
            elapsed = 0.0
            for index in range(len(dist) - 1):
                elapsed += (dist[index] + speed - 1) // speed
            elapsed += dist[-1] / speed
            return elapsed <= hour
        low = 1
        high = 10_000_000
        while low < high:
            middle = (low + high) // 2
            if can_arrive(middle):
                high = middle
            else:
                low = middle + 1
        return low if can_arrive(low) else -1
