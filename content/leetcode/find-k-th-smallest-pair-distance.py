class Solution:
    def smallestDistancePair(self, nums, k):
        nums.sort();low,high=0,nums[-1]-nums[0]
        while low<high:
            distance=(low+high)//2;left=count=0
            for right in range(len(nums)):
                while nums[right]-nums[left]>distance:left+=1
                count+=right-left
            if count>=k:high=distance
            else:low=distance+1
        return low
