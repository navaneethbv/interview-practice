from bisect import bisect_right


class Solution:
    def maximumCoins(self, coins, k):
        intervals = sorted(coins)
        starts = [row[0] for row in intervals]
        prefix = [0]
        for left, right, value in intervals:
            prefix.append(prefix[-1] + (right - left + 1) * value)

        def total_through(coordinate):
            index = bisect_right(starts, coordinate) - 1
            if index < 0:
                return 0
            left, right, value = intervals[index]
            return prefix[index] + (min(coordinate, right) - left + 1) * value

        best = 0
        for left, right, _ in intervals:
            for start in (left, max(1, right - k + 1)):
                best = max(best, total_through(start + k - 1) - total_through(start - 1))
        return best
