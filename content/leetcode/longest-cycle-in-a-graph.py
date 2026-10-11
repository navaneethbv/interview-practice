class Solution:
    def longestCycle(self, edges):
        seen_at = [0] * len(edges)
        clock = 1
        best = -1
        for start in range(len(edges)):
            if seen_at[start]:
                continue
            walk_start = clock
            node = start
            while node != -1 and not seen_at[node]:
                seen_at[node] = clock
                clock += 1
                node = edges[node]
            if node != -1 and seen_at[node] >= walk_start:
                best = max(best, clock - seen_at[node])
        return best
