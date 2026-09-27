class Solution:
    def validPath(self, n, edges, source, destination):
        parent=list(range(n))
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        for a,b in edges:parent[find(a)]=find(b)
        return find(source)==find(destination)
