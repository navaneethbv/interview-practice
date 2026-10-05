from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, temperatures, k):
        low = deque()
        high = deque()
        left = 0
        best = 0
        for right, value in enumerate(temperatures):
            self._add_temperature(temperatures, right, value, low, high)
            while right - left + 1 > k:
                if low[0] == left:
                    low.popleft()
                if high[0] == left:
                    high.popleft()
                left += 1
            if right - left + 1 == k:
                best = max(best, temperatures[high[0]] - temperatures[low[0]])
        return best

    @staticmethod
    def _add_temperature(temperatures, index, value, low, high):
        while low and temperatures[low[-1]] >= value:
            low.pop()
        while high and temperatures[high[-1]] <= value:
            high.pop()
        low.append(index)
        high.append(index)
