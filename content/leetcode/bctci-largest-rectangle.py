from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, tiles):
        stack = []
        best = 0
        for index in range(len(tiles) + 1):
            height = tiles[index] if index < len(tiles) else 0
            while stack and tiles[stack[-1]] > height:
                previous = stack.pop()
                left = stack[-1] if stack else -1
                best = max(best, tiles[previous] * (index - left - 1))
            stack.append(index)
        return best
