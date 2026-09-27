class Solution:
    def rotate(self, nums, k):
        rotations = k % len(nums)

        def reverse(left, right):
            while left < right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1

        reverse(0, len(nums) - 1)
        reverse(0, rotations - 1)
        reverse(rotations, len(nums) - 1)
