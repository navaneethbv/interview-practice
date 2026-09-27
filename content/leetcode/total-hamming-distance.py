class Solution:
    def totalHammingDistance(self,nums):
        return sum((ones:=sum((x>>bit)&1 for x in nums))*(len(nums)-ones) for bit in range(30))
