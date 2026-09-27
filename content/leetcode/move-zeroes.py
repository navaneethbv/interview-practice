class Solution:
    def moveZeroes(self, nums):
        write_index = 0
        for read_index in range(len(nums)):
            if nums[read_index] != 0:
                nums[write_index], nums[read_index] = nums[read_index], nums[write_index]
                write_index += 1
