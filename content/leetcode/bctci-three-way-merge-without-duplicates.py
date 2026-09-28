class Solution:
    def mergeThree(self, arr1, arr2, arr3):
        arrays = (arr1, arr2, arr3)
        positions = [0, 0, 0]
        merged = []
        while True:
            fronts = [(arrays[k][positions[k]], k) for k in range(3) if positions[k] < len(arrays[k])]
            if not fronts:
                return merged
            value, source = min(fronts)
            positions[source] += 1
            if not merged or merged[-1] != value:
                merged.append(value)
