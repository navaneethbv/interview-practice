class Solution:
    def findUnsortedSequence(self, array):
        end = -1
        running_max = float("-inf")
        for index, value in enumerate(array):
            if value < running_max:
                end = index
            running_max = max(running_max, value)
        if end == -1:
            return [-1, -1]
        start = -1
        running_min = float("inf")
        for index in range(len(array) - 1, -1, -1):
            if array[index] > running_min:
                start = index
            running_min = min(running_min, array[index])
        return [start, end]
