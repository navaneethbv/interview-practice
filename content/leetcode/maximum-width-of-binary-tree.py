from collections import deque
class Solution:
    def widthOfBinaryTree(self, root):
        q=deque([(root,0)]);best=0
        while q:
            offset=q[0][1];last=0
            for _ in range(len(q)):
                node,index=q.popleft();index-=offset;last=index
                if node.left:q.append((node.left,2*index))
                if node.right:q.append((node.right,2*index+1))
            best=max(best,last+1)
        return best
