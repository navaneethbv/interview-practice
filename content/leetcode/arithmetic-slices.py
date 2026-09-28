class Solution:
    def numberOfArithmeticSlices(self, nums):
        ending = 0
        total = 0
        for i in range(2,len(nums)):
            same_difference = nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]
            ending = ending + 1 if same_difference else 0
            total += ending
        return total
