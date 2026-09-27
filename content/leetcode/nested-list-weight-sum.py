class Solution:
    def depthSum(self, nestedList):
        return self._sum_at_depth(nestedList, 1)

    def _sum_at_depth(self, items, depth):
        total = 0
        for item in items:
            if item.isInteger():
                total += item.getInteger() * depth
            else:
                total += self._sum_at_depth(item.getList(), depth + 1)
        return total
