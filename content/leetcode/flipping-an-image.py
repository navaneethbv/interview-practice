class Solution:
    def flipAndInvertImage(self,image):return [[1-v for v in reversed(row)] for row in image]
