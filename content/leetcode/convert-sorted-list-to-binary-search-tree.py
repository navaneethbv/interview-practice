class Solution:
    def sortedListToBST(self, head):
        values = []
        while head:
            values.append(head.val)
            head = head.next
        def build(lo,hi):
            if lo >= hi:
                return None
            mid = (lo + hi) // 2
            node = TreeNode(values[mid])
            node.left = build(lo, mid)
            node.right = build(mid + 1, hi)
            return node
        return build(0, len(values))
