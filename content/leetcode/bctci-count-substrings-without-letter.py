from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, s):
        run = 0
        answer = 0
        for letter in s:
            run = 0 if letter == 'a' else run + 1
            answer += run
        return answer
