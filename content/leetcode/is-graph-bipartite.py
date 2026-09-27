class Solution:
    def isBipartite(self,graph):
        color={}
        return all(start in color or self._color(graph,start,color) for start in range(len(graph)))

    def _color(self, graph, start, color):
        """Two-colors start's component; False on an edge between equal colors."""
        color[start]=0;stack=[start]
        while stack:
            u=stack.pop()
            for v in graph[u]:
                if v not in color:color[v]=1-color[u];stack.append(v)
                elif color[v]==color[u]:return False
        return True
