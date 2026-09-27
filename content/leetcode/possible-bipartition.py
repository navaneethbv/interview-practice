class Solution:
    def possibleBipartition(self, n, dislikes):
        edges=[[] for _ in range(n+1)]
        for a,b in dislikes: edges[a].append(b); edges[b].append(a)
        colors={}
        for start in range(1,n+1):
            if start in colors: continue
            colors[start]=0; queue=[start]
            for node in queue:
                for neighbor in edges[node]:
                    if neighbor in colors:
                        if colors[neighbor]==colors[node]: return False
                    else: colors[neighbor]=1-colors[node]; queue.append(neighbor)
        return True
