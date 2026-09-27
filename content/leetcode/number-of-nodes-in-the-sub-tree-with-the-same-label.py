class Solution:
    def countSubTrees(self, n, edges, labels):
        adjacency = [[] for _ in range(n)]
        for first, second in edges:
            adjacency[first].append(second)
            adjacency[second].append(first)
        parents = [-1] * n
        order = [0]
        for node in order:
            for child in adjacency[node]:
                if child != parents[node]:
                    parents[child] = node
                    order.append(child)
        counts = [[0] * 26 for _ in range(n)]
        result = [0] * n
        for node in reversed(order):
            label_index = ord(labels[node]) - ord("a")
            counts[node][label_index] += 1
            result[node] = counts[node][label_index]
            parent = parents[node]
            if parent >= 0:
                for label_index in range(26):
                    counts[parent][label_index] += counts[node][label_index]
        return result
