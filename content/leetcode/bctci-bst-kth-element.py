class Solution:
    def kthSmallest(self, root, k):
        stack, node = [], root
        while True:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            if k == 0:
                return node.val
            k -= 1
            node = node.right
