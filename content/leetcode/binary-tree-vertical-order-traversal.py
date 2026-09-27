class Solution:
    def verticalOrder(self, root):
        from collections import deque,defaultdict
        columns=defaultdict(list); queue=deque([(root,0)]) if root else deque()
        while queue:
            node,column=queue.popleft(); columns[column].append(node.val)
            if node.left: queue.append((node.left,column-1))
            if node.right: queue.append((node.right,column+1))
        return [columns[c] for c in sorted(columns)]
