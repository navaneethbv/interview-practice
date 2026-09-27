class Solution:
    def maxNumEdgesToRemove(self, n, edges):
        a=list(range(n+1)); b=a[:]
        def join(parent,u,v):
            def find(x):
                while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]
                return x
            u,v=find(u),find(v)
            if u==v: return False
            parent[u]=v; return True
        used=ca=cb=0
        for kind,u,v in sorted(edges,reverse=True):
            if kind==3:
                x=join(a,u,v); y=join(b,u,v); ca+=x; cb+=y; used+=x or y
            elif kind==1:
                x=join(a,u,v); ca+=x; used+=x
            else:
                y=join(b,u,v); cb+=y; used+=y
        return len(edges)-used if ca==cb==n-1 else -1
