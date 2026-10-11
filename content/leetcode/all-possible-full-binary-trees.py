from functools import lru_cache


class Solution:
    def allPossibleFBT(self, n):
        @lru_cache(None)
        def build(size):
            if size == 1:
                return [TreeNode(0)]
            trees = []
            for left in range(1, size - 1, 2):
                for l in build(left):
                    for r in build(size - 1 - left):
                        trees.append(TreeNode(0, l, r))
            return trees

        return build(n) if n % 2 == 1 else []
