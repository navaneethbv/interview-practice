class Solution:
    def twoSum(self, arr):
        left, right = 0, len(arr) - 1
        while left < right:
            total = arr[left] + arr[right]
            if total == 0:
                return True
            if total > 0:
                right -= 1
            else:
                left += 1
        return False
