class Solution:
    def isSameTree(self, p, q):
        stack = [(p, q)]
        while stack:
            first, second = stack.pop()
            if not first or not second:
                if first is not second:
                    return False
                continue
            if first.val != second.val:
                return False
            stack.extend([(first.left, second.left), (first.right, second.right)])
        return True
