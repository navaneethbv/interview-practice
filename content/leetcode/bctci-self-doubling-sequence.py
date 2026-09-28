from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, n):
        answer = 0
        while n:
            n &= n - 1
            answer += 1
        return answer
