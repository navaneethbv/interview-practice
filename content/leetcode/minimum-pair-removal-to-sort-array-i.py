class Solution:
    def minimumPairRemoval(self, nums):
        values = nums[:]
        operations = 0
        while any(left > right for left, right in zip(values, values[1:])):
            index = min(range(len(values) - 1),
                        key=lambda position: values[position] + values[position + 1])
            merged = values[index] + values[index + 1]
            values[index:index + 2] = [merged]
            operations += 1
        return operations
