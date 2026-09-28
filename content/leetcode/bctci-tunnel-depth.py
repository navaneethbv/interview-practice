from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, tunnel_network):
        low = 0
        high = len(tunnel_network)
        while low + 1 < high:
            middle = (low + high) // 2
            if any(tunnel_network[middle]):
                low = middle
            else:
                high = middle
        return low
