class Solution:

    def maximumDetonation(self, bombs):
        g = [[j for j, (a, b, _) in enumerate(bombs) if (x - a) ** 2 + (y - b) ** 2 <= r * r] for x, y, r in bombs]
        return max((self._reach(g, start) for start in range(len(bombs))), default=0)

    def _reach(self, g, start):
        seen = {start}
        stack = [start]
        while stack:
            for v in g[stack.pop()]:
                if v not in seen:
                    seen.add(v)
                    stack.append(v)
        return len(seen)
