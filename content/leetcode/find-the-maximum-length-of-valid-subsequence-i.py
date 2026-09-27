class Solution:
    def maximumLength(self, nums):
        even=sum(value%2==0 for value in nums); alternating=1
        for a,b in zip(nums,nums[1:]): alternating+=(a%2)!=(b%2)
        return max(even,len(nums)-even,alternating)
