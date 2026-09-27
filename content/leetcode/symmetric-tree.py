class Solution:
    def isSymmetric(self, root):
        stack = [(root.left, root.right)]
        while stack:
            left_node, right_node = stack.pop()
            if not left_node or not right_node:
                if left_node is not right_node:
                    return False
                continue
            if left_node.val != right_node.val:
                return False
            stack.append((left_node.left, right_node.right))
            stack.append((left_node.right, right_node.left))
        return True
