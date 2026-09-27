class Solution:
    def possibleBipartition(self, n, dislikes):
        edges=[[] for _ in range(n+1)]
        for a,b in dislikes: edges[a].append(b); edges[b].append(a)
        colors={}
        return all(start in colors or self._color(edges,start,colors) for start in range(1,n+1))

    def _color(self, edges, start, colors):
        """Two-colors start's component; False when two people who dislike each other match."""
        colors[start]=0; queue=[start]
        for node in queue:
            for neighbor in edges[node]:
                if neighbor not in colors: colors[neighbor]=1-colors[node]; queue.append(neighbor)
                elif colors[neighbor]==colors[node]: return False
        return True
