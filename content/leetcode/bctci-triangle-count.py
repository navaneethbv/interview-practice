class Solution:
    def countTriangles(self, root):
        if root is None:
            return 0
        left, right, pairs = root.left, root.right, 0
        while left and right:
            pairs += 1
            left, right = left.left, right.right
        return pairs + self.countTriangles(root.left) + self.countTriangles(root.right)
