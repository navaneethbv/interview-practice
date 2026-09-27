class Solution:
    def majorityElement(self, nums):
        candidate = 0
        vote_count = 0
        for value in nums:
            if vote_count == 0:
                candidate = value
            vote_count += 1 if value == candidate else -1
        return candidate
