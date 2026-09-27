from collections import deque
class Solution:
    def maxSlidingWindow(self, nums, k):
        queue = deque(); result = []
        for i,value in enumerate(nums):
            while queue and queue[0] <= i-k: queue.popleft()
            while queue and nums[queue[-1]] <= value: queue.pop()
            queue.append(i)
            if i >= k-1: result.append(nums[queue[0]])
        return result
