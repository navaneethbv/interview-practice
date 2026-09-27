from collections import defaultdict
class Solution:
    def calcEquation(self, equations, values, queries):
        graph=defaultdict(list)
        for (a,b),v in zip(equations,values):graph[a].append((b,v));graph[b].append((a,1/v))
        out=[]
        for start,end in queries:
            if start not in graph or end not in graph:out.append(-1.0);continue
            stack=[(start,1.0)];seen={start};answer=-1.0
            while stack:
                node,value=stack.pop()
                if node==end:answer=value;break
                for child,ratio in graph[node]:
                    if child not in seen:seen.add(child);stack.append((child,value*ratio))
            out.append(answer)
        return out
