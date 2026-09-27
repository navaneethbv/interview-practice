class Solution:
    def containsNearbyDuplicate(self, nums, k):
        last_index = {}
        for index, value in enumerate(nums):
            if value in last_index and index - last_index[value] <= k:
                return True
            last_index[value] = index
        return False
