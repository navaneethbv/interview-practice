from collections import deque


class Solution:
    def maxResult(self, nums: list[int], k: int) -> int:
        best = deque([(0, nums[0])])
        score = nums[0]
        for index in range(1, len(nums)):
            while best[0][0] < index - k:
                best.popleft()
            score = nums[index] + best[0][1]
            while best and best[-1][1] <= score:
                best.pop()
            best.append((index, score))
        return score
