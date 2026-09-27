from collections import deque


class Solution:
    def maxSlidingWindow(self, nums, k):
        candidates = deque()
        result = []
        for index, value in enumerate(nums):
            while candidates and candidates[0] <= index - k:
                candidates.popleft()
            while candidates and nums[candidates[-1]] <= value:
                candidates.pop()
            candidates.append(index)
            if index >= k - 1:
                result.append(nums[candidates[0]])
        return result
