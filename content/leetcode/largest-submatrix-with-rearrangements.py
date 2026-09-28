class Solution:
    def largestSubmatrix(self, matrix):
        heights = [0] * len(matrix[0])
        answer = 0
        for row in matrix:
            heights = [height + 1 if value else 0
                       for height, value in zip(heights, row)]
            for width, height in enumerate(sorted(heights, reverse=True), 1):
                answer = max(answer, width * height)
        return answer
