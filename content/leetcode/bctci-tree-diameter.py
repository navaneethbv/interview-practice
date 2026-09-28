from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, labels, children):
        if not labels:
            return 0
        order = [0]
        for node in order:
            order.extend(child for child in children[node] if child != -1)
        heights = [0] * len(labels)
        best = 0
        for node in reversed(order):
            left, right = children[node]
            a = heights[left] if left != -1 else 0
            b = heights[right] if right != -1 else 0
            best = max(best, a + b)
            heights[node] = 1 + max(a, b)
        return best
