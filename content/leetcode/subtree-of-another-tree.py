class Solution:
    def isSubtree(self, root, subRoot):
        stack = [root]
        while stack:
            node = stack.pop()
            if self._same(node, subRoot):
                return True
            stack.extend(child for child in (node.left, node.right) if child)
        return False

    def _same(self, first, second):
        pairs = [(first, second)]
        while pairs:
            first, second = pairs.pop()
            if not first or not second:
                if first is not second:
                    return False
                continue
            if first.val != second.val:
                return False
            pairs.extend([(first.left, second.left), (first.right, second.right)])
        return True
