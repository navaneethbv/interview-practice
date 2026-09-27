class Solution:
    def checkSubarraySum(self, nums, k):
        first={0:-1};remainder=0
        for i,x in enumerate(nums):
            remainder=(remainder+x)%k
            if remainder in first:
                if i-first[remainder]>=2:return True
            else:first[remainder]=i
        return False
