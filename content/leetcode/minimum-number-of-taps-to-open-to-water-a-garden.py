class Solution:
    def minTaps(self, n, ranges):
        farthest_from = [0] * (n + 1)
        for tap, radius in enumerate(ranges):
            left = max(0, tap - radius)
            right = min(n, tap + radius)
            farthest_from[left] = max(farthest_from[left], right)

        taps = 0
        covered_end = 0
        next_end = 0
        for position in range(n):
            next_end = max(next_end, farthest_from[position])
            if position == covered_end:
                if next_end <= position:
                    return -1
                taps += 1
                covered_end = next_end
        return taps
