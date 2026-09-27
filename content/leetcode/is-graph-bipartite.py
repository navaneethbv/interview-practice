class Solution:
    def isBipartite(self,graph):
        color={}
        for start in range(len(graph)):
            if start in color:continue
            color[start]=0;stack=[start]
            while stack:
                u=stack.pop()
                for v in graph[u]:
                    if v in color:
                        if color[v]==color[u]:return False
                    else:color[v]=1-color[u];stack.append(v)
        return True
