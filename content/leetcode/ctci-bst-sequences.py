class Solution:
    def allSequences(self, root):
        if root is None:
            return [[]]
        results = []
        for left in self.allSequences(root.left):
            for right in self.allSequences(root.right):
                self._weave(left, 0, right, 0, [root.val], results)
        return results

    def _weave(self, first, i, second, j, prefix, results):
        if i == len(first) or j == len(second):
            results.append(prefix + first[i:] + second[j:])
            return
        prefix.append(first[i])
        self._weave(first, i + 1, second, j, prefix, results)
        prefix[-1] = second[j]
        self._weave(first, i, second, j + 1, prefix, results)
        prefix.pop()
