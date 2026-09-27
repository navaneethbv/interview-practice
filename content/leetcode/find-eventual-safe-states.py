class Solution:
    def eventualSafeNodes(self, graph):
        reverse_edges = [[] for _ in graph]
        remaining = [0] * len(graph)
        for node, neighbors in enumerate(graph):
            remaining[node] = len(neighbors)
            for neighbor in neighbors:
                reverse_edges[neighbor].append(node)
        safe = []
        queue = [node for node, count in enumerate(remaining) if count == 0]
        for node in queue:
            safe.append(node)
            for predecessor in reverse_edges[node]:
                remaining[predecessor] -= 1
                if remaining[predecessor] == 0:
                    queue.append(predecessor)
        return sorted(safe)
