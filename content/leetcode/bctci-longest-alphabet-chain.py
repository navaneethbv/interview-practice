from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, arr):
        counts = [0] * 26
        for letter in arr:
            counts[ord(letter) - 97] += 1
        cycles = min(counts)
        counts = [count - cycles for count in counts]
        best = 0
        run = 0
        for index in range(52):
            run = run + 1 if counts[index % 26] else 0
            best = max(best, run)
        return cycles * 26 + best
