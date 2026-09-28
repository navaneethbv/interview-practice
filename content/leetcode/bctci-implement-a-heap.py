class Heap:
    def __init__(self, kind, values):
        self.is_min = kind == "min"
        self.items = list(values)
        for index in range(len(self.items) // 2 - 1, -1, -1):
            self._sift_down(index)

    def _before(self, a, b):
        return a < b if self.is_min else a > b

    def push(self, x):
        self.items.append(x)
        index = len(self.items) - 1
        while index > 0:
            parent = (index - 1) // 2
            if not self._before(self.items[index], self.items[parent]):
                break
            self.items[index], self.items[parent] = self.items[parent], self.items[index]
            index = parent

    def pop(self):
        if not self.items:
            return -1
        top = self.items[0]
        last = self.items.pop()
        if self.items:
            self.items[0] = last
            self._sift_down(0)
        return top

    def top(self):
        return self.items[0] if self.items else -1

    def size(self):
        return len(self.items)

    def _sift_down(self, index):
        while True:
            best = index
            for child in (2 * index + 1, 2 * index + 2):
                if child < len(self.items) and self._before(self.items[child], self.items[best]):
                    best = child
            if best == index:
                return
            self.items[index], self.items[best] = self.items[best], self.items[index]
            index = best
