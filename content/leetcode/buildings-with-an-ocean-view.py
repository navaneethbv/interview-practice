class Solution:
    def findBuildings(self, heights):
        visible_indices = []
        tallest_to_right = 0

        for index in range(len(heights) - 1, -1, -1):
            if heights[index] > tallest_to_right:
                visible_indices.append(index)
                tallest_to_right = heights[index]

        return visible_indices[::-1]
