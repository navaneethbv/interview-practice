class Solution:
    def sameComponent(self, graph, queries):
        label = [-1] * len(graph)
        for start in range(len(graph)):
            if label[start] != -1:
                continue
            label[start] = start
            stack = [start]
            while stack:
                for neighbor in graph[stack.pop()]:
                    if label[neighbor] == -1:
                        label[neighbor] = start
                        stack.append(neighbor)
        return [label[a] == label[b] for a, b in queries]
