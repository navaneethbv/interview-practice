class Solution:
    def missingNumber(self, arr):
        difference=(arr[-1]-arr[0])//len(arr)
        for i,value in enumerate(arr):
            expected=arr[0]+i*difference
            if value!=expected:return expected
        return arr[0]
