class Solution:
    def maxChunksToSorted(self,arr):
        peak=-1;count=0
        for i,v in enumerate(arr):
            peak=max(peak,v)
            if peak==i:count+=1
        return count
