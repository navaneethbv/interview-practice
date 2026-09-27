class Solution:
    def findClosestElements(self, arr, k, x):
        left = 0
        right = len(arr) - k
        while left < right:
            middle = (left + right) // 2
            left_distance = x - arr[middle]
            right_distance = arr[middle + k] - x
            if left_distance > right_distance:
                left = middle + 1
            else:
                right = middle
        return arr[left:left + k]
