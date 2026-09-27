class Solution:
    def criticalConnections(self, n, connections):
        adj=[[] for _ in range(n)]
        for a,b in connections: adj[a].append(b); adj[b].append(a)
        discovery=[-1]*n; low=[0]*n; parent=[-1]*n; discovery[0]=low[0]=0; timer=1; bridges=[]
        stack=[(0,iter(adj[0]))]
        while stack:
            node,neighbors=stack[-1]
            child=next(neighbors,None)
            if child is None:
                stack.pop(); self._finish(node,parent,discovery,low,bridges)
            elif child==parent[node]:
                continue
            elif discovery[child]==-1:
                parent[child]=node; discovery[child]=low[child]=timer; timer+=1; stack.append((child,iter(adj[child])))
            else:
                low[node]=min(low[node],discovery[child])
        return bridges

    def _finish(self, node, parent, discovery, low, bridges):
        """Propagates a finished node's low link to its parent and records a bridge."""
        p=parent[node]
        if p==-1: return
        if low[node]>discovery[p]: bridges.append([p,node])
        low[p]=min(low[p],low[node])
