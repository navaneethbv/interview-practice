class Solution:
    def fourSum(self, nums, target):
        nums.sort()
        quadruplets = []
        for first in range(len(nums) - 3):
            if first > 0 and nums[first] == nums[first - 1]:
                continue
            for second in range(first + 1, len(nums) - 2):
                if second > first + 1 and nums[second] == nums[second - 1]:
                    continue
                self._collect_pairs(nums, first, second, target, quadruplets)
        return quadruplets

    def _collect_pairs(self, nums, first, second, target, quadruplets):
        left = second + 1
        right = len(nums) - 1
        while left < right:
            total = nums[first] + nums[second] + nums[left] + nums[right]
            if total < target:
                left += 1
            elif total > target:
                right -= 1
            else:
                quadruplets.append([nums[first], nums[second], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
