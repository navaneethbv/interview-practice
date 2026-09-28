from collections import deque


class Solution:
    def canCross(self, furniture, d):
        n = len(furniture)
        reached = [False] * n
        reached[0] = True
        queue = deque([0])
        while queue:
            current = queue.popleft()
            for other in range(n):
                if not reached[other] and self._gap_squared(furniture[current], furniture[other]) <= d * d:
                    reached[other] = True
                    queue.append(other)
        return reached[n - 1]

    def _gap_squared(self, a, b):
        dx = max(0, b[0] - a[2], a[0] - b[2])
        dy = max(0, b[1] - a[3], a[1] - b[3])
        return dx * dx + dy * dy
