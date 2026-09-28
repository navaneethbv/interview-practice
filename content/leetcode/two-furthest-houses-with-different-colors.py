class Solution:

    def maxDistance(self, colors):
        return max((j - i for i in range(len(colors)) for j in range(i + 1, len(colors)) if colors[i] != colors[j]))
