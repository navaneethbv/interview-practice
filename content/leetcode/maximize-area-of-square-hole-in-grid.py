class Solution:
    def maximizeSquareHoleArea(self, _n, _m, hBars, vBars):
        def opening(bars):
            best = 1
            current = 1
            previous = None
            for bar in sorted(bars):
                if previous is not None and bar == previous + 1:
                    current += 1
                else:
                    current = 2
                best = max(best, current)
                previous = bar
            return best
        side = min(opening(hBars), opening(vBars))
        return side * side
