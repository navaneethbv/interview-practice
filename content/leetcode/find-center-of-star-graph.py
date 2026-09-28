class Solution:
    def findCenter(self, edges):
        first = edges[0][0]
        if first in edges[1]:
            return first
        return edges[0][1]
