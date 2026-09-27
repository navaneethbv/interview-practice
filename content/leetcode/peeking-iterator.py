class PeekingIterator:
    def __init__(self, iterator):
        self.iterator = iterator
        self.has_buffer = False
        self.buffer = None

    def peek(self):
        if not self.has_buffer:
            self.buffer = self.iterator.next()
            self.has_buffer = True
        return self.buffer

    def next(self):
        if self.has_buffer:
            self.has_buffer = False
            return self.buffer
        return self.iterator.next()

    def hasNext(self):
        return self.has_buffer or self.iterator.hasNext()
