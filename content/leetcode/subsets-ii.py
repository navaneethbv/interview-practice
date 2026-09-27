class Solution:
    def subsetsWithDup(self, nums):
        nums.sort()
        result = []
        def visit(start, path):
            result.append(path)
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i-1]:
                    continue
                visit(i+1, path+[nums[i]])
        visit(0, [])
        return result
