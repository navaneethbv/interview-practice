from math import isqrt


class Solution:
    def minNumberOfSeconds(self, mountainHeight, workerTimes):
        low = 0
        high = min(workerTimes) * mountainHeight * (mountainHeight + 1) // 2
        while low < high:
            middle = (low + high) // 2
            completed = sum(
                (isqrt(1 + 8 * (middle // time)) - 1) // 2
                for time in workerTimes
            )
            if completed >= mountainHeight:
                high = middle
            else:
                low = middle + 1
        return low
