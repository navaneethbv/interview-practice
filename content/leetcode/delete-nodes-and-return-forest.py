class Solution:

    def delNodes(self, root, to_delete):
        deleted = set(to_delete)
        out = []

        def visit(n, isroot):
            if not n:
                return None
            remove = n.val in deleted
            if isroot and (not remove):
                out.append(n)
            n.left = visit(n.left, remove)
            n.right = visit(n.right, remove)
            return None if remove else n
        visit(root, True)
        return out
