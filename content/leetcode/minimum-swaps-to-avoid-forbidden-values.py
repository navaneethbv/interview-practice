class Solution:
    def minSwaps(self, nums, forbidden):
        from collections import Counter
        n=len(nums); combined=Counter(nums)+Counter(forbidden)
        if max(combined.values())>n: return -1
        bad=Counter(value for value,blocked in zip(nums,forbidden) if value==blocked)
        return max((sum(bad.values())+1)//2,max(bad.values(),default=0))
