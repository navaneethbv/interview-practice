from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, players):
        parent = list(range(len(players)))
        sizes = [1] * len(players)
        def find(node):
            while node != parent[node]:
                parent[node] = parent[parent[node]]
                node = parent[node]
            return node
        rows = {}
        columns = {}
        groups = len(players)
        for index, (x, y) in enumerate(players):
            for mapping, coordinate in ((rows, x), (columns, y)):
                if coordinate in mapping:
                    a, b = find(index), find(mapping[coordinate])
                    if a != b:
                        self._merge(parent, sizes, a, b)
                        groups -= 1
                mapping[coordinate] = index
        return groups

    @staticmethod
    def _merge(parent, sizes, a, b):
        if sizes[a] < sizes[b]:
            a, b = b, a
        parent[b] = a
        sizes[a] += sizes[b]
