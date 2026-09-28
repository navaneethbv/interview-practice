class Solution:
    def isValidUndirected(self, graph):
        n = len(graph)
        edges = set()
        for node, neighbors in enumerate(graph):
            for neighbor in neighbors:
                if not 0 <= neighbor < n or neighbor == node or (node, neighbor) in edges:
                    return False
                edges.add((node, neighbor))
        return all((b, a) in edges for a, b in edges)
