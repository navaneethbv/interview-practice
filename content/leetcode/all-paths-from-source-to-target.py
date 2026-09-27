class Solution:
    def allPathsSourceTarget(self, graph):
        out=[]
        def visit(path):
            node=path[-1]
            if node==len(graph)-1:out.append(path);return
            for child in graph[node]:visit(path+[child])
        visit([0]);return out
