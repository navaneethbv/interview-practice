class Solution:
    def canSeePersonsCount(self, heights):
        stack = []
        visible = [0] * len(heights)
        for index in range(len(heights) - 1, -1, -1):
            while stack and stack[-1] < heights[index]:
                stack.pop()
                visible[index] += 1
            if stack:
                visible[index] += 1
            stack.append(heights[index])
        return visible
