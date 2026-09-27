import random
class RandomizedSet:
    def __init__(self):
        self.values = []
        self.index = {}
        self.random = random.Random(0)

    def insert(self, val):
        if val in self.index:
            return False
        self.index[val] = len(self.values)
        self.values.append(val)
        return True

    def remove(self, val):
        if val not in self.index:
            return False
        removed_index = self.index.pop(val)
        last_value = self.values.pop()
        if removed_index < len(self.values):
            self.values[removed_index] = last_value
            self.index[last_value] = removed_index
        return True

    def getRandom(self):
        return self.random.choice(self.values)
