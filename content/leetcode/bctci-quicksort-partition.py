class Solution:
    def partition(self, arr, pivot):
        smaller, current, larger = 0, 0, len(arr) - 1
        while current <= larger:
            if arr[current] < pivot:
                arr[smaller], arr[current] = arr[current], arr[smaller]
                smaller += 1
                current += 1
            elif arr[current] > pivot:
                arr[current], arr[larger] = arr[larger], arr[current]
                larger -= 1
            else:
                current += 1
