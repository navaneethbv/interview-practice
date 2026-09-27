from collections import deque
class Solution:
    def minimumTime(self, n, relations, time):
        graph=[[] for _ in range(n)];degree=[0]*n
        for a,b in relations:graph[a-1].append(b-1);degree[b-1]+=1
        finish=time[:];q=deque(i for i in range(n) if degree[i]==0)
        while q:
            node=q.popleft()
            for child in graph[node]:
                finish[child]=max(finish[child],finish[node]+time[child]);degree[child]-=1
                if degree[child]==0:q.append(child)
        return max(finish)
