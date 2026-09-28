class Solution:
    def intervalIntersection(self, arr1, arr2):
        result = []
        i = j = 0
        while i < len(arr1) and j < len(arr2):
            start = max(arr1[i][0], arr2[j][0])
            end = min(arr1[i][1], arr2[j][1])
            if start <= end:
                result.append([start, end])
            if arr1[i][1] < arr2[j][1]:
                i += 1
            else:
                j += 1
        return result
