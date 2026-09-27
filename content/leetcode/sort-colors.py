class Solution:
    def sortColors(self, nums):
        next_zero = 0
        current = 0
        next_two = len(nums) - 1
        while current <= next_two:
            if nums[current] == 0:
                nums[next_zero], nums[current] = nums[current], nums[next_zero]
                next_zero += 1
                current += 1
            elif nums[current] == 2:
                nums[current], nums[next_two] = nums[next_two], nums[current]
                next_two -= 1
            else:
                current += 1
