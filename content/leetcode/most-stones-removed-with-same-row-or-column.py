class Solution:
    def removeStones(self,stones):
        parent={}
        def find(x):
            parent.setdefault(x,x)
            if parent[x]!=x:parent[x]=find(parent[x])
            return parent[x]
        for r,c in stones:parent[find(('r',r))]=find(('c',c))
        return len(stones)-len({find(x) for x in parent})
