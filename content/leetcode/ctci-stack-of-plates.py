class SetOfStacks:
    def __init__(self, capacity):
        self.capacity = capacity
        self.stacks = []

    def push(self, value):
        if not self.stacks or len(self.stacks[-1]) == self.capacity:
            self.stacks.append([])
        self.stacks[-1].append(value)

    def pop(self):
        return self.popAt(len(self.stacks) - 1)

    def popAt(self, index):
        if index < 0 or index >= len(self.stacks):
            return -1
        value = self.stacks[index].pop()
        if not self.stacks[index]:
            del self.stacks[index]
        return value

    def stackCount(self):
        return len(self.stacks)
