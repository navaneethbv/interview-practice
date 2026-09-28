from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, arr, w):
        arr.sort()
        for first in range(len(arr) - 2):
            left, right = first + 1, len(arr) - 1
            while left < right:
                total = arr[first] + arr[left] + arr[right]
                if total == w:
                    return True
                if total < w:
                    left += 1
                else:
                    right -= 1
        return False
