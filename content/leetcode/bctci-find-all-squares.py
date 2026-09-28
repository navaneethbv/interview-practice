class Solution:
    def findSquares(self, arr):
        position = {value: index for index, value in enumerate(arr)}
        return [[i, position[value * value]] for i, value in enumerate(arr) if value * value in position]
