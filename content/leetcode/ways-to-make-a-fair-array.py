class Solution:
    def waysToMakeFair(self, nums):
        right = [0, 0]
        for index, value in enumerate(nums):
            right[index % 2] += value
        left = [0, 0]
        count = 0
        for index, value in enumerate(nums):
            parity = index % 2
            right[parity] -= value
            if left[0] + right[1] == left[1] + right[0]:
                count += 1
            left[parity] += value
        return count
