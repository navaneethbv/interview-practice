class Solution:
    def twoArrayTwoSum(self, sorted_arr, unsorted_arr):
        for j, value in enumerate(unsorted_arr):
            i = self._find(sorted_arr, -value)
            if i != -1:
                return [i, j]
        return [-1, -1]

    def _find(self, arr, target):
        low, high = 0, len(arr) - 1
        while low <= high:
            mid = (low + high) // 2
            if arr[mid] == target:
                return mid
            if arr[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1
