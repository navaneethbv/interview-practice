class Solution:
    def makeConnected(self, n, connections):
        if len(connections)<n-1: return -1
        parent=list(range(n)); components=n
        def find(x):
            while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]
            return x
        for a,b in connections:
            a,b=find(a),find(b)
            if a!=b: parent[a]=b; components-=1
        return components-1
