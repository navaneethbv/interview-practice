class Solution:
    def sortByBits(self, arr):
        return sorted(arr, key=lambda value: (value.bit_count(), value))
