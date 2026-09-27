from collections import deque
class Solution:
    def kthLargestLevelSum(self, root, k):
        q=deque([root]);sums=[]
        while q:
            total=0
            for _ in range(len(q)):
                node=q.popleft();total+=node.val
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            sums.append(total)
        return sorted(sums,reverse=True)[k-1] if len(sums)>=k else -1
