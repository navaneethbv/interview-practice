class Solution:
    def minCostToSupplyWater(self,n,wells,pipes):
        parent=list(range(n+1))
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        edges=[(c,0,i+1) for i,c in enumerate(wells)]+[(c,a,b) for a,b,c in pipes];total=0
        for cost,a,b in sorted(edges):
            a,b=find(a),find(b)
            if a!=b:parent[a]=b;total+=cost
        return total
