class Solution:
    def maximalRectangle(self, matrix):
        heights = [0] * len(matrix[0])
        best_area = 0
        for row in matrix:
            for column, cell in enumerate(row):
                heights[column] = heights[column] + 1 if cell == "1" else 0
            best_area = max(best_area, self._largest_histogram(heights))
        return best_area

    def _largest_histogram(self, heights):
        stack = []
        best_area = 0
        for index in range(len(heights) + 1):
            current_height = heights[index] if index < len(heights) else 0
            start = index
            while stack and stack[-1][1] > current_height:
                start, height = stack.pop()
                best_area = max(best_area, height * (index - start))
            if not stack or stack[-1][1] < current_height:
                stack.append((start, current_height))
        return best_area
