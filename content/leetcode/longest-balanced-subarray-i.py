class _RangeAddTree:
    def __init__(self, size):
        self.size = size
        self.minimum = [0] * (4 * size)
        self.maximum = [0] * (4 * size)
        self.lazy = [0] * (4 * size)

    def _apply(self, node, change):
        self.minimum[node] += change
        self.maximum[node] += change
        self.lazy[node] += change

    def _push(self, node):
        if self.lazy[node] == 0:
            return
        change = self.lazy[node]
        self._apply(node * 2, change)
        self._apply(node * 2 + 1, change)
        self.lazy[node] = 0

    def update(self, node, left, right, update_left, update_right, change):
        if update_left <= left and right <= update_right:
            self._apply(node, change)
            return
        self._push(node)
        middle = (left + right) // 2
        if update_left <= middle:
            self.update(node * 2, left, middle, update_left, update_right, change)
        if update_right > middle:
            self.update(node * 2 + 1, middle + 1, right, update_left, update_right, change)
        self.minimum[node] = min(self.minimum[node * 2], self.minimum[node * 2 + 1])
        self.maximum[node] = max(self.maximum[node * 2], self.maximum[node * 2 + 1])

    def first_zero(self, node, left, right, end):
        if left > end or self.minimum[node] > 0 or self.maximum[node] < 0:
            return self.size
        if left == right:
            return left
        self._push(node)
        middle = (left + right) // 2
        candidate = self.first_zero(node * 2, left, middle, end)
        if candidate < self.size:
            return candidate
        return self.first_zero(node * 2 + 1, middle + 1, right, end)


class Solution:
    def longestBalanced(self, nums):
        size = len(nums)
        tree = _RangeAddTree(size)
        last_seen = {}
        answer = 0
        for index, value in enumerate(nums):
            change = 1 if value % 2 == 0 else -1
            first_start = last_seen.get(value, -1) + 1
            tree.update(1, 0, size - 1, first_start, index, change)
            last_seen[value] = index
            start = tree.first_zero(1, 0, size - 1, index)
            if start <= index:
                answer = max(answer, index - start + 1)
        return answer
