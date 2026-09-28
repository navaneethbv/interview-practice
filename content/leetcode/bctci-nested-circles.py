class Solution:
    def areNested(self, circles):
        ordered = sorted(circles, key=lambda circle: -circle[2])
        for outer, inner in zip(ordered, ordered[1:]):
            gap = outer[2] - inner[2]
            dx, dy = outer[0] - inner[0], outer[1] - inner[1]
            if gap <= 0 or dx * dx + dy * dy >= gap * gap:
                return False
        return True
