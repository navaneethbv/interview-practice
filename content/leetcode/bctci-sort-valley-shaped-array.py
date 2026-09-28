class Solution:
    def sortValley(self, arr):
        result = [0] * len(arr)
        left, right = 0, len(arr) - 1
        for position in range(len(arr) - 1, -1, -1):
            if arr[left] >= arr[right]:
                result[position] = arr[left]
                left += 1
            else:
                result[position] = arr[right]
                right -= 1
        return result
