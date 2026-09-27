class Solution:
    def findTheCity(self, n, edges, distanceThreshold):
        distance=[[float('inf')]*n for _ in range(n)]
        for i in range(n): distance[i][i]=0
        for a,b,w in edges: distance[a][b]=distance[b][a]=w
        for middle in range(n):
            for a in range(n):
                for b in range(n): distance[a][b]=min(distance[a][b],distance[a][middle]+distance[middle][b])
        return min(range(n),key=lambda i:(sum(j!=i and distance[i][j]<=distanceThreshold for j in range(n)),-i))
