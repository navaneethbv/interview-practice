class ListItem:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = ListItem(None)
        self.tail = ListItem(None)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.length = 0

    def _insert_after(self, node, v):
        fresh = ListItem(v)
        fresh.prev, fresh.next = node, node.next
        node.next.prev = fresh
        node.next = fresh
        self.length += 1

    def _remove(self, node):
        if node is self.head or node is self.tail:
            return -1
        node.prev.next = node.next
        node.next.prev = node.prev
        self.length -= 1
        return node.val

    def push_front(self, v):
        self._insert_after(self.head, v)

    def pop_front(self):
        return self._remove(self.head.next)

    def push_back(self, v):
        self._insert_after(self.tail.prev, v)

    def pop_back(self):
        return self._remove(self.tail.prev)

    def size(self):
        return self.length

    def contains(self, v):
        node = self.head.next
        while node is not self.tail:
            if node.val == v:
                return True
            node = node.next
        return False
