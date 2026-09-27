class Solution:
    def search(self, nums, target):
        left = 0
        right = len(nums) - 1
        while left <= right:
            middle = (left + right) // 2
            if nums[middle] == target:
                return True
            if nums[left] == nums[middle] == nums[right]:
                left += 1
                right -= 1
                continue
            if self._target_is_right(nums, left, middle, right, target):
                left = middle + 1
            else:
                right = middle - 1
        return False

    def _target_is_right(self, nums, left, middle, right, target):
        if nums[left] <= nums[middle]:
            return not nums[left] <= target < nums[middle]
        return nums[middle] < target <= nums[right]
