from collections import defaultdict
class Solution:
    def calcEquation(self, equations, values, queries):
        graph=defaultdict(list)
        for (a,b),v in zip(equations,values):graph[a].append((b,v));graph[b].append((a,1/v))
        return [self._evaluate(graph,start,end) for start,end in queries]

    def _evaluate(self, graph, start, end):
        if start not in graph or end not in graph:return -1.0
        stack=[(start,1.0)];seen={start}
        while stack:
            node,value=stack.pop()
            if node==end:return value
            for child,ratio in graph[node]:
                if child not in seen:seen.add(child);stack.append((child,value*ratio))
        return -1.0
