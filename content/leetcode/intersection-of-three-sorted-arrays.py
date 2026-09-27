class Solution:
    def arraysIntersection(self, arr1, arr2, arr3):
        first = 0
        second = 0
        third = 0
        result = []
        while first < len(arr1) and second < len(arr2) and third < len(arr3):
            smallest = min(arr1[first], arr2[second], arr3[third])
            if arr1[first] == arr2[second] == arr3[third]:
                result.append(smallest)
            if arr1[first] == smallest:
                first += 1
            if arr2[second] == smallest:
                second += 1
            if arr3[third] == smallest:
                third += 1
        return result
