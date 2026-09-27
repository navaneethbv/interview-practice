from collections import deque
class Solution:
    def eventualSafeNodes(self, graph):
        reverse=[[] for _ in graph];degree=list(map(len,graph))
        for a,neighbors in enumerate(graph):
            for b in neighbors:reverse[b].append(a)
        q=deque(i for i,d in enumerate(degree) if d==0);out=[]
        while q:
            node=q.popleft();out.append(node)
            for parent in reverse[node]:
                degree[parent]-=1
                if degree[parent]==0:q.append(parent)
        return sorted(out)
