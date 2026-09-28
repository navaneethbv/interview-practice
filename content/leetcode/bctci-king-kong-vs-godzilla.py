from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, street):
        k = len(street)

        answer = [False] * len(street)
        stack = []
        for index, value in enumerate(street):
            while stack and street[stack[-1]] >= value:
                stack.pop()
            answer[index] = bool(stack and index - stack[-1] <= k)
            stack.append(index)
        stack.clear()
        for index in range(len(street) - 1, -1, -1):
            while stack and street[stack[-1]] <= street[index]:
                stack.pop()
            answer[index] = answer[index] and bool(stack and stack[-1] - index <= k)
            stack.append(index)
        return answer
