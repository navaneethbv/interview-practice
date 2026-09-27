class Solution:
    def countSubTrees(self, n, edges, labels):
        adj=[[] for _ in range(n)]
        for a,b in edges: adj[a].append(b); adj[b].append(a)
        parents=[-1]*n; order=[0]
        for node in order:
            for child in adj[node]:
                if child!=parents[node]: parents[child]=node; order.append(child)
        counts=[[0]*26 for _ in range(n)]; result=[0]*n
        for node in reversed(order):
            label=ord(labels[node])-97; counts[node][label]+=1; result[node]=counts[node][label]
            if parents[node]>=0:
                for c in range(26): counts[parents[node]][c]+=counts[node][c]
        return result
