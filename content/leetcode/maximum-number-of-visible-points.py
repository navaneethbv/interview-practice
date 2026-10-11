import math


class Solution:
    def visiblePoints(self, points, angle, location):
        here = 0
        angles = []
        for x, y in points:
            if x == location[0] and y == location[1]:
                here += 1
            else:
                angles.append(math.degrees(math.atan2(y - location[1], x - location[0])))
        angles.sort()
        angles += [a + 360 for a in angles]
        best = left = 0
        for right in range(len(angles)):
            while angles[right] - angles[left] > angle + 1e-9:
                left += 1
            best = max(best, right - left + 1)
        return best + here
