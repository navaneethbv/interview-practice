class Solution:
    def getTargetCopy(self, original, cloned, target):
        stack = [(original, cloned)]
        while stack:
            source, copy = stack.pop()
            if source is target:
                return copy
            if source.left is not None:
                stack.append((source.left, copy.left))
            if source.right is not None:
                stack.append((source.right, copy.right))
        return None
