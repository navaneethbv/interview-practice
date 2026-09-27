class Solution:
    def sortArray(self, nums):
        width = 1
        length = len(nums)
        temporary = [0] * length
        while width < length:
            for start in range(0, length, 2 * width):
                middle = min(start + width, length)
                end = min(start + 2 * width, length)
                self._merge_run(nums, temporary, start, middle, end)
            nums, temporary = temporary, nums
            width *= 2
        return nums

    def _merge_run(self, source, target, start, middle, end):
        left = start
        right = middle
        for index in range(start, end):
            if left < middle and (right == end or source[left] <= source[right]):
                target[index] = source[left]
                left += 1
            else:
                target[index] = source[right]
                right += 1
