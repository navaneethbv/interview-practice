from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, candidates, votes):
        parties = list(zip(votes, candidates))
        heapq.heapify(parties)
        total = sum(votes)
        for count, name in parties:
            if count * 2 > total:
                return name
        while len(parties) > 1:
            merged = [heapq.heappop(parties), heapq.heappop(parties)]
            cutoff = merged[-1][0]
            while parties and parties[0][0] == cutoff:
                merged.append(heapq.heappop(parties))
            count = sum(item[0] for item in merged)
            name = min(merged, key=lambda item: (-item[0], item[1]))[1]
            if count * 2 > total:
                return name
            heapq.heappush(parties, (count, name))
        return parties[0][1]
