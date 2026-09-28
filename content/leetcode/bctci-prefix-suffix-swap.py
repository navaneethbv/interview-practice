class Solution:
    def prefixSuffixSwap(self, arr):
        n = len(arr)
        self._reverse(arr, 0, n - 1)
        self._reverse(arr, 0, 2 * n // 3 - 1)
        self._reverse(arr, 2 * n // 3, n - 1)

    def _reverse(self, arr, left, right):
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
