class Solution:
    def findScore(self, nums):
        marked = set()
        score = 0
        ordered_items = sorted((value, index) for index, value in enumerate(nums))
        for value, index in ordered_items:
            if index in marked:
                continue
            score += value
            marked.update((index - 1, index, index + 1))
        return score
