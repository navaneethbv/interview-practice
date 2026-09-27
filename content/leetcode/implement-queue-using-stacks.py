class MyQueue:
    def __init__(self):
        self.incoming, self.outgoing = [], []
    def push(self, x):
        self.incoming.append(x)
    def _transfer(self):
        if not self.outgoing:
            while self.incoming:
                self.outgoing.append(self.incoming.pop())
    def pop(self):
        self._transfer()
        return self.outgoing.pop()
    def peek(self):
        self._transfer()
        return self.outgoing[-1]
    def empty(self):
        return not self.incoming and not self.outgoing
