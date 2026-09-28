class DisjointSets:
    def __init__(self, n):
        self.parent = list(range(n))
        self.sizes = [1] * n
        self.groups = n
        self.largest = 1 if n else 0

    def find(self, node):
        while node != self.parent[node]:
            self.parent[node] = self.parent[self.parent[node]]
            node = self.parent[node]
        return node

    def join(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.sizes[a] < self.sizes[b]:
            a, b = b, a
        self.parent[b] = a
        self.sizes[a] += self.sizes[b]
        self.groups -= 1
        self.largest = max(self.largest, self.sizes[a])
        return True

from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, V, edges):
        sets = DisjointSets(V)
        total = 0
        for u, v, weight in sorted(edges, key=lambda edge: edge[2]):
            if sets.join(u, v):
                total += weight
        return total
