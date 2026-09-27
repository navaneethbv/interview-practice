class Solution:
    def findErrorNums(self, nums):
        from collections import Counter
        counts=Counter(nums)
        return [next(value for value,count in counts.items() if count==2),next(value for value in range(1,len(nums)+1) if value not in counts)]
