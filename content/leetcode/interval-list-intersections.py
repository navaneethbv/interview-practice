class Solution:
    def intervalIntersection(self, firstList, secondList):
        first_index = 0
        second_index = 0
        intersections = []
        while first_index < len(firstList) and second_index < len(secondList):
            first_start, first_end = firstList[first_index]
            second_start, second_end = secondList[second_index]
            start = max(first_start, second_start)
            end = min(first_end, second_end)
            if start <= end:
                intersections.append([start, end])
            if first_end < second_end:
                first_index += 1
            else:
                second_index += 1
        return intersections
