class Solution:
    def minSumSquareDiff(self, nums1, nums2, k1, k2):
        differences = [abs(first - second) for first, second in zip(nums1, nums2)]
        operations = k1 + k2
        if operations >= sum(differences):
            return 0
        left = 0
        right = max(differences)
        while left<right:
            middle = (left + right) // 2
            required = sum(max(0, difference - middle) for difference in differences)
            if required <= operations:
                right = middle
            else:
                left = middle + 1
        cap = left
        spent = sum(max(0, difference - cap) for difference in differences)
        remaining = operations - spent
        squared_sum = sum(min(difference, cap) ** 2 for difference in differences)
        return squared_sum - remaining * (2 * cap - 1)
