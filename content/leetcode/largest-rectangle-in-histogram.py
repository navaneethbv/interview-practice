class Solution:
    def largestRectangleArea(self, heights):
        pending = []
        best = 0
        for index in range(len(heights) + 1):
            height = heights[index] if index < len(heights) else 0
            start = index
            while pending and pending[-1][1] > height:
                start, previous_height = pending.pop()
                best = max(best, previous_height * (index - start))
            pending.append((start, height))
        return best
