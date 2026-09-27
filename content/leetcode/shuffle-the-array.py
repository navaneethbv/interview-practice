class Solution:
    def shuffle(self, nums, n):
        shuffled = []
        for first, second in zip(nums[:n], nums[n:]):
            shuffled.extend([first, second])
        return shuffled
