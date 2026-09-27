class Solution:
    def insert(self, head, insertVal):
        if head is None:
            head = Node(insertVal)
            head.next = head
            return head

        node = head
        while True:
            next_node = node.next
            if self._fits_between(node.val, next_node.val, insertVal):
                break
            node = next_node
            if node is head:
                break
        node.next = Node(insertVal, node.next)
        return head

    @staticmethod
    def _fits_between(current, following, value):
        if current <= value <= following:
            return True
        return current > following and (value >= current or value <= following)
