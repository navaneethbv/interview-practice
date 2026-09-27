class Solution:
    def threeSumClosest(self, nums, target):
        nums.sort()
        best = sum(nums[:3])
        for first_index in range(len(nums) - 2):
            left = first_index + 1
            right = len(nums) - 1
            while left < right:
                total = nums[first_index] + nums[left] + nums[right]
                if abs(total - target) < abs(best - target):
                    best = total
                if total == target:
                    return total
                if total < target:
                    left += 1
                else:
                    right -= 1
        return best
