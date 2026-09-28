class Solution:
    def legoBlocks(self, n):
        blocks, width = 1, 1
        for _ in range(n - 1):
            width = 2 * width + 1
            blocks = 2 * blocks + width
        return blocks
