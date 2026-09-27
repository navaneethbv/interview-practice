class Solution:
    def shipWithinDays(self, weights, days):
        low = max(weights)
        high = sum(weights)
        while low < high:
            capacity = (low + high) // 2
            if self._days_needed(weights, capacity) <= days:
                high = capacity
            else:
                low = capacity + 1
        return low

    @staticmethod
    def _days_needed(weights, capacity):
        used = 1
        load = 0
        for weight in weights:
            if load + weight > capacity:
                used += 1
                load = 0
            load += weight
        return used
