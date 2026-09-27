from collections import deque
class Solution:
    def distanceK(self, root, target, k):
        parents={root:None};stack=[root]
        while stack:
            node=stack.pop()
            for child in (node.left,node.right):
                if child:parents[child]=node;stack.append(child)
        q=deque([(target,0)]);seen={target};out=[]
        while q:
            node,d=q.popleft()
            if d==k:out.append(node.val);continue
            for other in (node.left,node.right,parents[node]):
                if other and other not in seen:seen.add(other);q.append((other,d+1))
        return out
