class Solution:
    def isTree(self, graph):
        edges = sum(len(neighbors) for neighbors in graph) // 2
        if edges != len(graph) - 1:
            return False
        seen = {0}
        stack = [0]
        while stack:
            for neighbor in graph[stack.pop()]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    stack.append(neighbor)
        return len(seen) == len(graph)
