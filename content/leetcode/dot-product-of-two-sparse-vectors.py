class SparseVector:
    def __init__(self, nums):self.values={i:v for i,v in enumerate(nums) if v}
    def dotProduct(self, vec):return sum(v*vec.values.get(i,0) for i,v in self.values.items())
