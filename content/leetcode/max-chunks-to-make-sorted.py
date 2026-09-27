class Solution:
    def maxChunksToSorted(self, arr):
        largest_seen = -1
        chunks = 0
        for index, value in enumerate(arr):
            largest_seen = max(largest_seen, value)
            if largest_seen == index:
                chunks += 1
        return chunks
