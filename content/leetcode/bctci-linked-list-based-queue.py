class ListItem:
    def __init__(self, val):
        self.val = val
        self.next = None


class LinkedQueue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def push(self, v):
        node = ListItem(v)
        if self.tail is None:
            self.head = node
        else:
            self.tail.next = node
        self.tail = node
        self.length += 1

    def pop(self):
        if self.head is None:
            return -1
        value = self.head.val
        self.head = self.head.next
        if self.head is None:
            self.tail = None
        self.length -= 1
        return value

    def peek(self):
        return -1 if self.head is None else self.head.val

    def size(self):
        return self.length

    def empty(self):
        return self.length == 0
