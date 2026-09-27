class Solution:
    def medianSlidingWindow(self, nums, k):
        import bisect
        window=sorted(nums[:k]); result=[]
        for end in range(k,len(nums)+1):
            result.append((window[(k-1)//2]+window[k//2])/2)
            if end<len(nums):
                window.pop(bisect.bisect_left(window,nums[end-k])); bisect.insort(window,nums[end])
        return result
