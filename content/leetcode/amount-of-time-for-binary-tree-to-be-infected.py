from collections import deque
class Solution:
 def amountOfTime(self,root,start):
  graph={};stack=[root]
  while stack:
   node=stack.pop();graph.setdefault(node.val,[])
   for child in (node.left,node.right):
    if child:
     graph[node.val].append(child.val);graph.setdefault(child.val,[]).append(node.val);stack.append(child)
  q=deque([(start,0)]);seen={start};answer=0
  while q:
   u,d=q.popleft();answer=max(answer,d)
   for v in graph[u]:
    if v not in seen:seen.add(v);q.append((v,d+1))
  return answer
