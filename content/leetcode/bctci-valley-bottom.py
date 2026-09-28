class Solution:
    def valleyBottom(self, arr):
        low, high = 0, len(arr) - 1
        while low < high:
            mid = (low + high) // 2
            if arr[mid] < arr[mid + 1]:
                high = mid
            else:
                low = mid + 1
        return arr[low]
