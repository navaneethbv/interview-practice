class Solution:
    def summaryRanges(self, nums):
        ranges = []
        start = 0

        while start < len(nums):
            end = start
            while end + 1 < len(nums) and nums[end + 1] == nums[end] + 1:
                end += 1

            if start == end:
                ranges.append(str(nums[start]))
            else:
                ranges.append(f"{nums[start]}->{nums[end]}")
            start = end + 1

        return ranges
