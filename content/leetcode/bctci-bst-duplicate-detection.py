class Solution:
    def hasDuplicates(self, root):
        previous = None
        stack, node = [], root
        while stack or node:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            if previous is not None and previous == node.val:
                return True
            previous = node.val
            node = node.right
        return False
