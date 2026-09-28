class Solution:
    def mergeBsts(self, root1, root2):
        first, second = self._inorder(root1), self._inorder(root2)
        merged, i, j = [], 0, 0
        while i < len(first) or j < len(second):
            if j == len(second) or (i < len(first) and first[i] <= second[j]):
                merged.append(first[i])
                i += 1
            else:
                merged.append(second[j])
                j += 1
        return merged

    def _inorder(self, root):
        values, stack, node = [], [], root
        while stack or node:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            values.append(node.val)
            node = node.right
        return values
