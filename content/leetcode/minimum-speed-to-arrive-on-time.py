class Solution:
    def minSpeedOnTime(self, dist, hour):
        if hour >= sum(dist):
            return 1
        deadline = round(hour * 100)
        if deadline <= 100 * (len(dist) - 1):
            return -1
        low = 1
        high = 10_000_000
        while low < high:
            middle = (low + high) // 2
            if self._can_arrive(dist, deadline, middle):
                high = middle
            else:
                low = middle + 1
        return low if self._can_arrive(dist, deadline, low) else -1

    def _can_arrive(self, dist, deadline, speed):
        whole_hours = 0
        for index in range(len(dist) - 1):
            whole_hours += (dist[index] + speed - 1) // speed
        remaining = deadline - 100 * whole_hours
        if remaining <= 0:
            return False
        final_distance = 100 * dist[-1]
        minimum_final_speed = (final_distance + remaining - 1) // remaining
        return speed >= minimum_final_speed
