class NestedIterator:
    def __init__(self, nestedList):
        self.stack = list(reversed(nestedList))

    def hasNext(self):
        while self.stack:
            if self.stack[-1].isInteger():
                return True
            nested_values = self.stack.pop().getList()
            self.stack.extend(reversed(nested_values))
        return False

    def next(self):
        self.hasNext()
        return self.stack.pop().getInteger()
