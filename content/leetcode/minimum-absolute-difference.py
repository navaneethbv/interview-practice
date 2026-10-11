class Solution:
    def minimumAbsDifference(self, arr):
        arr = sorted(arr)
        best = min(b - a for a, b in zip(arr, arr[1:]))
        return [[a, b] for a, b in zip(arr, arr[1:]) if b - a == best]
