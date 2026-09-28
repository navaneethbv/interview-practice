class Solution:
    def evaluate(self, root, kinds, nums):
        kind = kinds[root.val]
        if kind == "num":
            return nums[root.val]
        values = [self.evaluate(child, kinds, nums) for child in root.children]
        if kind == "sum":
            return sum(values)
        if kind == "max":
            return max(values)
        if kind == "min":
            return min(values)
        product = 1
        for value in values:
            product *= value
        return product
