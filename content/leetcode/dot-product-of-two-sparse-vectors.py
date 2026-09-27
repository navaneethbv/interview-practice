class SparseVector:
    def __init__(self, nums):
        self.values = {index: value for index, value in enumerate(nums) if value != 0}

    def dotProduct(self, vec):
        total = 0
        for index, value in self.values.items():
            total += value * vec.values.get(index, 0)
        return total
