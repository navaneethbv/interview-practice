class Solution:
    def connect(self, root):
        if root is None:
            return None
        root.next = None
        level_start = root
        while level_start:
            level_start = self._connect_level(level_start)
        return root

    def _connect_level(self, level_start):
        dummy = Node(0)
        tail = dummy
        current = level_start
        while current:
            for child in (current.left, current.right):
                if child:
                    tail.next = child
                    tail = child
            current = current.next
        tail.next = None
        return dummy.next
