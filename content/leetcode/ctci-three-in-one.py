class FixedMultiStack:
    STACKS = 3

    def __init__(self, stackSize):
        self.capacity = stackSize
        self.values = [0] * (stackSize * self.STACKS)
        self.sizes = [0] * self.STACKS

    def push(self, stackNum, value):
        if self.sizes[stackNum] == self.capacity:
            return False
        self.values[self._top_index(stackNum) + 1] = value
        self.sizes[stackNum] += 1
        return True

    def pop(self, stackNum):
        if self.isEmpty(stackNum):
            return -1
        value = self.values[self._top_index(stackNum)]
        self.sizes[stackNum] -= 1
        return value

    def peek(self, stackNum):
        if self.isEmpty(stackNum):
            return -1
        return self.values[self._top_index(stackNum)]

    def isEmpty(self, stackNum):
        return self.sizes[stackNum] == 0

    def _top_index(self, stackNum):
        return stackNum * self.capacity + self.sizes[stackNum] - 1
