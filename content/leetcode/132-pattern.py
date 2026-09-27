class Solution:
    def find132pattern(self, nums):
        decreasing_candidates = []
        middle_value = float("-inf")
        for value in reversed(nums):
            if value < middle_value:
                return True
            while decreasing_candidates and decreasing_candidates[-1] < value:
                middle_value = decreasing_candidates.pop()
            decreasing_candidates.append(value)
        return False
