class Solution:
    def subsetsWithDup(self, nums):
        sorted_nums = sorted(nums)
        result = []

        def visit(start_index, path):
            result.append(path[:])
            for index in range(start_index, len(sorted_nums)):
                if index > start_index and sorted_nums[index] == sorted_nums[index - 1]:
                    continue
                path.append(sorted_nums[index])
                visit(index + 1, path)
                path.pop()

        visit(0, [])
        return result
