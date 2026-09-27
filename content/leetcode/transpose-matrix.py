class Solution:
    def transpose(self, matrix):return [list(column) for column in zip(*matrix)]
