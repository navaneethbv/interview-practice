class Solution:
    def arrayNesting(self, nums):
        visited = set()
        longest_cycle = 0
        for start in range(len(nums)):
            current = start
            cycle_length = 0
            while current not in visited:
                visited.add(current)
                cycle_length += 1
                current = nums[current]
            longest_cycle = max(longest_cycle, cycle_length)
        return longest_cycle
