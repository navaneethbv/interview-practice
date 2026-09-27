class Solution:
    def majorityElement(self, nums):
        a=b=None;ca=cb=0
        for x in nums:
            if x==a:ca+=1
            elif x==b:cb+=1
            elif ca==0:a=x;ca=1
            elif cb==0:b=x;cb=1
            else:ca-=1;cb-=1
        return [x for x in (a,b) if x is not None and nums.count(x)>len(nums)//3]
