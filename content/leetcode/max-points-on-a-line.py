from collections import Counter
from math import gcd


class Solution:
    def maxPoints(self, points):
        best = 1

        for anchor_index, (anchor_x, anchor_y) in enumerate(points):
            slopes = Counter()
            for point_x, point_y in points[anchor_index + 1:]:
                delta_x = point_x - anchor_x
                delta_y = point_y - anchor_y
                divisor = gcd(delta_x, delta_y)
                delta_x //= divisor
                delta_y //= divisor
                if delta_x < 0 or (delta_x == 0 and delta_y < 0):
                    delta_x = -delta_x
                    delta_y = -delta_y
                slopes[(delta_x, delta_y)] += 1
                best = max(best, slopes[(delta_x, delta_y)] + 1)

        return best
