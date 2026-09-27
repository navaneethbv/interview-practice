class Solution:
    def findDuplicates(self, nums):
        duplicates = []

        for value in nums:
            index = abs(value) - 1
            if nums[index] < 0:
                duplicates.append(index + 1)
            else:
                nums[index] = -nums[index]

        return duplicates
