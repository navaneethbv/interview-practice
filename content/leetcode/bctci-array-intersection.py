class Solution:
    def intersection(self, arr1, arr2):
        i = j = 0
        common = []
        while i < len(arr1) and j < len(arr2):
            if arr1[i] == arr2[j]:
                common.append(arr1[i])
                i += 1
                j += 1
            elif arr1[i] < arr2[j]:
                i += 1
            else:
                j += 1
        return common
