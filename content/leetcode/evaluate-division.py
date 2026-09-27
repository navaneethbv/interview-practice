from collections import defaultdict


class Solution:
    def calcEquation(self, equations, values, queries):
        graph = defaultdict(list)
        for (first, second), value in zip(equations, values):
            graph[first].append((second, value))
            graph[second].append((first, 1 / value))

        answers = []
        for start, end in queries:
            answers.append(self._evaluate(graph, start, end))
        return answers

    def _evaluate(self, graph, start, end):
        if start not in graph or end not in graph:
            return -1.0

        stack = [(start, 1.0)]
        seen = {start}
        while stack:
            node, product = stack.pop()
            if node == end:
                return product
            for neighbor, ratio in graph[node]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    stack.append((neighbor, product * ratio))
        return -1.0
