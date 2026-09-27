class Solution:
    def maximumProduct(self, nums):
        ordered = sorted(nums)
        largest_product = ordered[-1] * ordered[-2] * ordered[-3]
        negative_pair_product = ordered[0] * ordered[1] * ordered[-1]
        return max(largest_product, negative_pair_product)
