def _find(parent, x):
    while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
    return x

class Solution:
    def numIslands2(self,_m,_n,positions):
        parent={};count=0;result=[]
        for r,c in positions:
            if (r,c) not in parent:count+=1-self._add_land(parent,r,c)
            result.append(count)
        return result

    def _add_land(self, parent, r, c):
        """Adds land at (r,c) and returns how many separate islands it joined together."""
        key=(r,c);parent[key]=key;merges=0
        for neighbor in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
            if neighbor not in parent:continue
            a,b=_find(parent,key),_find(parent,neighbor)
            if a!=b:parent[a]=b;merges+=1
        return merges
