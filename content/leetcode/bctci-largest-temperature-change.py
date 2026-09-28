from collections import deque


class Solution:
    def _window_extrema(self, values, width, minimum):
        candidates = deque()
        result = []
        for index, value in enumerate(values):
            if candidates and candidates[0] <= index - width:
                candidates.popleft()
            while candidates:
                previous = values[candidates[-1]]
                dominated = previous >= value if minimum else previous <= value
                if not dominated:
                    break
                candidates.pop()
            candidates.append(index)
            if index + 1 >= width:
                result.append(values[candidates[0]])
        return result

    def solve(self, temperatures, k):
        lows = self._window_extrema(temperatures, k, True)
        highs = self._window_extrema(temperatures, k, False)
        return max(high - low for low, high in zip(lows, highs))
