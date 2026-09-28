class Solution:
    def minEdgeReversals(self, n, edges):
        graph = [[] for _ in range(n)]
        for start, end in edges:
            graph[start].append((end, 0))
            graph[end].append((start, 1))

        parent = [-1] * n
        parent[0] = 0
        order = [0]
        edge_cost = [0] * n
        root_cost = 0
        for node in order:
            for neighbor, cost in graph[node]:
                if neighbor == parent[node]:
                    continue
                parent[neighbor] = node
                edge_cost[neighbor] = cost
                root_cost += cost
                order.append(neighbor)

        answers = [root_cost] * n
        for node in order[1:]:
            answers[node] = answers[parent[node]] + 1 - 2 * edge_cost[node]
        return answers
