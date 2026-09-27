class Solution:
    def minimumSemesters(self, n, relations):
        edges=[[] for _ in range(n+1)]; degree=[0]*(n+1)
        for a,b in relations: edges[a].append(b); degree[b]+=1
        level=[i for i in range(1,n+1) if degree[i]==0]; count=semesters=0
        while level:
            semesters+=1; count+=len(level); following=[]
            for node in level:
                for next_node in edges[node]:
                    degree[next_node]-=1
                    if degree[next_node]==0: following.append(next_node)
            level=following
        return semesters if count==n else -1
