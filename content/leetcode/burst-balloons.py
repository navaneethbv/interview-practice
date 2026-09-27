class Solution:
    def maxCoins(self, nums):
        values = [1] + nums + [1]
        interval_count = len(values)
        best = [[0] * interval_count for _ in range(interval_count)]

        for gap in range(2, interval_count):
            for left in range(interval_count - gap):
                right = left + gap
                for last_burst in range(left + 1, right):
                    coins = (
                        best[left][last_burst]
                        + best[last_burst][right]
                        + values[left] * values[last_burst] * values[right]
                    )
                    best[left][right] = max(best[left][right], coins)
        return best[0][-1]
