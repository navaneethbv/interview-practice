class Solution:
    def flipAndInvertImage(self, image):
        return [[1 - value for value in reversed(row)] for row in image]
