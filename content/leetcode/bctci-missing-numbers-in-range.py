class Solution:
    def missingNumbers(self, arr, low, high):
        missing = []
        index = 0
        for value in range(low, high + 1):
            while index < len(arr) and arr[index] < value:
                index += 1
            if index == len(arr) or arr[index] != value:
                missing.append(value)
        return missing
