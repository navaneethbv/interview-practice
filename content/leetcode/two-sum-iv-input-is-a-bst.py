class Solution:
    def findTarget(self, root, k):
        seen = set()
        stack = [root]
        while stack:
            node = stack.pop()
            complement = k - node.val
            if complement in seen:
                return True
            seen.add(node.val)
            if node.left:
                stack.append(node.left)
            if node.right:
                stack.append(node.right)
        return False
