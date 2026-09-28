class ListItem:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


class LinkedStack:
    def __init__(self):
        self.top = None
        self.length = 0

    def push(self, v):
        self.top = ListItem(v, self.top)
        self.length += 1

    def pop(self):
        if self.top is None:
            return -1
        value = self.top.val
        self.top = self.top.next
        self.length -= 1
        return value

    def peek(self):
        return -1 if self.top is None else self.top.val

    def size(self):
        return self.length

    def empty(self):
        return self.length == 0
