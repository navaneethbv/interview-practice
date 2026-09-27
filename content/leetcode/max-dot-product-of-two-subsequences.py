class Solution:
    def maxDotProduct(self, nums1, nums2):
        previous = [float("-inf")] * (len(nums2) + 1)
        for first_value in nums1:
            current = [float("-inf")] * (len(nums2) + 1)
            for index, second_value in enumerate(nums2, 1):
                product = first_value * second_value
                current[index] = max(
                    product + max(0, previous[index - 1]),
                    previous[index],
                    current[index - 1],
                )
            previous=current
        return previous[-1]
