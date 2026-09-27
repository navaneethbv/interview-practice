class Solution:
    def criticalConnections(self, n, connections):
        adjacency = [[] for _ in range(n)]
        for first, second in connections:
            adjacency[first].append(second)
            adjacency[second].append(first)
        discovery = [-1] * n
        low = [0] * n
        parent = [-1] * n
        discovery[0] = low[0] = 0
        timer = 1
        bridges = []
        stack = [(0, iter(adjacency[0]))]
        while stack:
            node, neighbors = stack[-1]
            child = next(neighbors, None)
            if child is None:
                stack.pop()
                self._finish(node, parent, discovery, low, bridges)
            elif child == parent[node]:
                continue
            elif discovery[child]==-1:
                parent[child] = node
                discovery[child] = low[child] = timer
                timer += 1
                stack.append((child, iter(adjacency[child])))
            else:
                low[node] = min(low[node], discovery[child])
        return bridges

    def _finish(self, node, parent, discovery, low, bridges):
        """Propagates a finished node's low link to its parent and records a bridge."""
        parent_node = parent[node]
        if parent_node == -1:
            return
        if low[node] > discovery[parent_node]:
            bridges.append([parent_node, node])
        low[parent_node] = min(low[parent_node], low[node])
