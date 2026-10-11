class Solution:
    def prevPermOpt1(self, arr):
        arr = list(arr)
        i = len(arr) - 2
        while i >= 0 and arr[i] <= arr[i + 1]:
            i -= 1
        if i < 0:
            return arr
        j = len(arr) - 1
        while arr[j] >= arr[i]:
            j -= 1
        while j > i + 1 and arr[j - 1] == arr[j]:
            j -= 1
        arr[i], arr[j] = arr[j], arr[i]
        return arr
