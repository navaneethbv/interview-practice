class Solution:
    def sumNumbers(self, root):
        if root is None:
            return 0

        total = 0
        pending = [(root, 0)]
        while pending:
            node, path_number = pending.pop()
            current_number = path_number * 10 + node.val
            if node.left is None and node.right is None:
                total += current_number
                continue
            if node.right is not None:
                pending.append((node.right, current_number))
            if node.left is not None:
                pending.append((node.left, current_number))
        return total
