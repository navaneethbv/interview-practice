class Solution:
    def countWays(self, nums):
        nums.sort()
        student_count = len(nums)
        ways = 0
        for selected in range(student_count + 1):
            enough_before = selected == 0 or nums[selected - 1] < selected
            enough_after = selected == student_count or nums[selected] > selected
            if enough_before and enough_after:
                ways += 1
        return ways
