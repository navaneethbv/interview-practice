class NumArray:
    def __init__(self, nums):
        self.prefix = [0]
        for value in nums:
            self.prefix.append(self.prefix[-1] + value)

    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]
