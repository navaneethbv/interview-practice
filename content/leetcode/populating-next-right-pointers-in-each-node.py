from collections import deque
class Solution:
    def connect(self, root):
        q=deque([root] if root else [])
        while q:
            previous=None
            for _ in range(len(q)):
                node=q.popleft()
                if previous:previous.next=node
                previous=node
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            previous.next=None
        return root
