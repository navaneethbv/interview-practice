class Solution:
    def threeSum(self, nums):
        nums.sort()
        result = []
        for i in range(len(nums)-2):
            if i == 0 or nums[i] != nums[i-1]:
                self._collect_pairs(nums, i, result)
        return result

    def _collect_pairs(self, nums, i, result):
        left, right = i+1, len(nums)-1
        while left < right:
            total = nums[i]+nums[left]+nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left-1]:
                    left += 1
