from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, temperatures, t):
        low = deque()
        high = deque()
        left = 0
        best = 0
        for right, value in enumerate(temperatures):
            while low and temperatures[low[-1]] >= value:
                low.pop()
            while high and temperatures[high[-1]] <= value:
                high.pop()
            low.append(right)
            high.append(right)
            while temperatures[high[0]] - temperatures[low[0]] > t:
                if low[0] == left:
                    low.popleft()
                if high[0] == left:
                    high.popleft()
                left += 1
            best = max(best, right - left + 1)

        return best
