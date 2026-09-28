class Solution:
    def combine(self, n, k):
        result = []
        self._visit(1, n, k, [], result)
        return result

    def _visit(self, start, n, k, path, result):
        if len(path) == k:
            result.append(path[:])
            return
        last = n - (k - len(path)) + 1
        for value in range(start, last + 1):
            path.append(value)
            self._visit(value + 1, n, k, path, result)
            path.pop()
