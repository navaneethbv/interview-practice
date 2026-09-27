class Solution:
    def threeSum(self, nums):
        nums.sort()
        result = []
        for anchor in range(len(nums) - 2):
            if anchor == 0 or nums[anchor] != nums[anchor - 1]:
                self._collect_pairs(nums, anchor, result)
        return result

    def _collect_pairs(self, nums, anchor, result):
        left, right = anchor + 1, len(nums) - 1
        while left < right:
            total = nums[anchor] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[anchor], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
