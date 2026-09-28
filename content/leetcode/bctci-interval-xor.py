from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, a, b):
        points = sorted(set(a + b))
        answer = []
        for left, right in zip(points, points[1:]):
            if (a[0] <= left < a[1]) != (b[0] <= left < b[1]):
                if answer and answer[-1][1] == left:
                    answer[-1][1] = right
                else:
                    answer.append([left, right])
        return answer
