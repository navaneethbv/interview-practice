class Solution:
    def nestedSum(self, arr):
        total = 0
        for item in arr:
            total += item.getInteger() if item.isInteger() else self.nestedSum(item.getList())
        return total
