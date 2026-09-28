from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, n):
        small = []
        large = []
        for divisor in range(1, math.isqrt(n) + 1):
            if n % divisor == 0:
                small.append(divisor)
                if divisor != n // divisor:
                    large.append(n // divisor)
        return small + large[::-1]
