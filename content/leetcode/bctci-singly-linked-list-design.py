class ListItem:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def push_front(self, v):
        self.head = ListItem(v, self.head)
        self.length += 1

    def pop_front(self):
        if self.head is None:
            return -1
        value = self.head.val
        self.head = self.head.next
        self.length -= 1
        return value

    def push_back(self, v):
        if self.head is None:
            self.push_front(v)
            return
        node = self.head
        while node.next:
            node = node.next
        node.next = ListItem(v)
        self.length += 1

    def pop_back(self):
        if self.head is None or self.head.next is None:
            return self.pop_front()
        node = self.head
        while node.next.next:
            node = node.next
        value = node.next.val
        node.next = None
        self.length -= 1
        return value

    def size(self):
        return self.length

    def contains(self, v):
        node = self.head
        while node and node.val != v:
            node = node.next
        return node is not None
