class Solution:
    def applyDeletes(self, nums, operations):
        deleted = [False] * len(nums)
        order = sorted(range(len(nums)), key=lambda index: (nums[index], index))
        pointer = 0
        for operation in operations:
            if operation >= 0:
                deleted[operation] = True
                continue
            while pointer < len(order) and deleted[order[pointer]]:
                pointer += 1
            if pointer < len(order):
                deleted[order[pointer]] = True
        return [value for index, value in enumerate(nums) if not deleted[index]]
