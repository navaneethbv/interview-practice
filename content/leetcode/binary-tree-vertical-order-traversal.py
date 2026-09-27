class Solution:
    def verticalOrder(self, root):
        from collections import defaultdict, deque

        if root is None:
            return []
        columns = defaultdict(list)
        pending = deque([(root, 0)])
        while pending:
            node, column = pending.popleft()
            columns[column].append(node.val)
            if node.left is not None:
                pending.append((node.left, column - 1))
            if node.right is not None:
                pending.append((node.right, column + 1))
        return [columns[column] for column in sorted(columns)]
