class Solution:
    def smallerNumbersThanCurrent(self, nums):
        counts=[0]*101
        for value in nums: counts[value]+=1
        prefix=0
        for i,count in enumerate(counts): counts[i]=prefix; prefix+=count
        return [counts[value] for value in nums]
