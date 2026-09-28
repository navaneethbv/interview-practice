from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, n):
        answer = 0
        factor = 2
        while factor * factor <= n:
            while n % factor == 0:
                answer += factor
                n //= factor
            factor += 1
        return answer + (n if n > 1 else 0)
