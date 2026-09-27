class Solution:
    def majorityElement(self, nums):
        candidate = count = 0
        for value in nums:
            if count == 0:
                candidate = value
            count += 1 if candidate == value else -1
        return candidate
