from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, launches, ads):
        maximum = -1
        second = -1
        answer = []
        for index in sorted(range(len(launches)), key=lambda i: launches[i]):
            value = ads[index]
            if second < value < maximum:
                answer.append(index)
            if value > maximum:
                second, maximum = maximum, value
            elif value > second:
                second = value
        return sorted(answer)
