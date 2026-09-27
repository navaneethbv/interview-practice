class Solution:
    def countSmaller(self, nums):
        ranks = {value: index + 1 for index, value in enumerate(sorted(set(nums)))}
        tree = [0] * (len(ranks) + 1)
        result = []
        for value in reversed(nums):
            rank = ranks[value]
            count = self._query(tree, rank - 1)
            result.append(count)
            self._update(tree, rank)
        return result[::-1]

    def _query(self, tree, index):
        total = 0
        while index:
            total += tree[index]
            index -= index & -index
        return total

    def _update(self, tree, index):
        while index < len(tree):
            tree[index] += 1
            index += index & -index
