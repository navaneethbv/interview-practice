class Solution:
    def removeDuplicates(self, nums):
        write_index = 0
        for value in nums:
            if write_index == 0 or value != nums[write_index - 1]:
                nums[write_index] = value
                write_index += 1
        return write_index
