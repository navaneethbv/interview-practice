from collections import deque
class Solution:
    def zigzagLevelOrder(self, root):
        if not root:return []
        q=deque([root]);out=[]
        while q:
            row=[]
            for _ in range(len(q)):
                node=q.popleft();row.append(node.val)
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            out.append(row[::-1] if len(out)%2 else row)
        return out
