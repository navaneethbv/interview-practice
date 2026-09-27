class Solution:
    def rangeSumBST(self, root, low, high):
        stack=[root];total=0
        while stack:
            node=stack.pop()
            if not node:continue
            if low<=node.val<=high:total+=node.val
            if node.val>low:stack.append(node.left)
            if node.val<high:stack.append(node.right)
        return total
