class Solution:
    def bstContains(self, root, target):
        node = root
        while node:
            if node.val == target:
                return True
            node = node.left if target < node.val else node.right
        return False
