from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, arr, k):
        left = 0
        zeros = 0
        best = 0
        for right, value in enumerate(arr):
            zeros += value == 0
            while zeros > k:
                zeros -= arr[left] == 0
                left += 1
            best = max(best, right - left + 1)
        return best
