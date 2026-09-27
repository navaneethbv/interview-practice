from collections import deque


def append_index(nums, index, minimum_indices, maximum_indices):
    value = nums[index]
    while minimum_indices and nums[minimum_indices[-1]] > value:
        minimum_indices.pop()
    while maximum_indices and nums[maximum_indices[-1]] < value:
        maximum_indices.pop()
    minimum_indices.append(index)
    maximum_indices.append(index)


def shrink_window(nums, left, limit, minimum_indices, maximum_indices):
    while nums[maximum_indices[0]] - nums[minimum_indices[0]] > limit:
        if minimum_indices[0] == left:
            minimum_indices.popleft()
        if maximum_indices[0] == left:
            maximum_indices.popleft()
        left += 1
    return left


class Solution:
    def longestSubarray(self, nums, limit):
        minimum_indices = deque()
        maximum_indices = deque()
        left = 0
        best = 0
        for right, value in enumerate(nums):
            append_index(nums, right, minimum_indices, maximum_indices)
            left = shrink_window(
                nums, left, limit, minimum_indices, maximum_indices
            )
            best = max(best, right - left + 1)
        return best
