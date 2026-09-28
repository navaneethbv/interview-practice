class Solution:
    def sortValleyPeak(self, array):
        result = list(array)
        for index in range(1, len(result), 2):
            largest = self._largest_near(result, index)
            result[index], result[largest] = result[largest], result[index]
        return result

    def _largest_near(self, values, index):
        largest = index
        for neighbor in (index - 1, index + 1):
            if neighbor < len(values) and values[neighbor] > values[largest]:
                largest = neighbor
        return largest
