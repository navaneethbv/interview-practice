from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, R, G, B):
        counts = [B, G, R]
        colors = 'BGR'
        present = [i for i in range(3) if counts[i]]
        if len(present) == 1:
            return colors[present[0]]
        if len(present) == 3:
            return colors
        answer = []
        for color in range(3):
            if counts[color] == 0 or any(counts[other] >= 2 for other in present if other != color):
                answer.append(colors[color])
        return ''.join(answer)
