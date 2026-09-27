class Solution:
    def numIslands2(self,m,n,positions):
        parent={};count=0;result=[]
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        for r,c in positions:
            key=(r,c)
            if key not in parent:
                parent[key]=key;count+=1
                for neighbor in [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
                    if neighbor in parent:
                        a,b=find(key),find(neighbor)
                        if a!=b:parent[a]=b;count-=1
            result.append(count)
        return result
