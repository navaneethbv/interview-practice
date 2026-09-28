from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, arr):
        answer = [-1] * len(arr)
        stack = []
        for index, value in enumerate(arr):
            while stack and arr[stack[-1]] < value:
                answer[stack.pop()] = index
            stack.append(index)
        return answer
