class Solution:

    def findLengthOfShortestSubarray(self, arr):
        n = len(arr)
        right = n - 1
        while right > 0 and arr[right - 1] <= arr[right]:
            right -= 1
        if right == 0:
            return 0
        best = right
        left = 0
        while left < n and (left == 0 or arr[left - 1] <= arr[left]):
            while right < n and arr[right] < arr[left]:
                right += 1
            best = min(best, right - left - 1)
            left += 1
        return best
