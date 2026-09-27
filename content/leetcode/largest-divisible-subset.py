class Solution:
    def largestDivisibleSubset(self, nums):
        nums.sort()
        lengths = [1] * len(nums)
        previous_index = [-1] * len(nums)
        best_index = 0

        for current in range(len(nums)):
            for previous in range(current):
                if (nums[current] % nums[previous] == 0
                        and lengths[previous] + 1 > lengths[current]):
                    lengths[current] = lengths[previous] + 1
                    previous_index[current] = previous
            if lengths[current] > lengths[best_index]:
                best_index = current

        subset = []
        while best_index >= 0:
            subset.append(nums[best_index])
            best_index = previous_index[best_index]
        return subset
