class Solution:
    def largestRectangleArea(self, heights):
        stack = []; best = 0
        for i,h in enumerate(heights+[0]):
            start = i
            while stack and stack[-1][1] > h:
                start,old = stack.pop(); best = max(best,old*(i-start))
            stack.append((start,h))
        return best
