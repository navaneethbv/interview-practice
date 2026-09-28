class Solution:

    def replaceElements(self, arr):
        largest = -1
        for i in range(len(arr) - 1, -1, -1):
            arr[i], largest = (largest, max(largest, arr[i]))
        return arr
