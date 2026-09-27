class Solution:
    def lowestCommonAncestor(self, root, p, q):
        parents = {root:None}
        stack = [root]
        while p not in parents or q not in parents:
            node = stack.pop()
            for child in (node.left,node.right):
                if child:
                    parents[child] = node
                    stack.append(child)
        ancestors = set()
        while p:
            ancestors.add(p)
            p = parents[p]
        while q not in ancestors:
            q = parents[q]
        return q
