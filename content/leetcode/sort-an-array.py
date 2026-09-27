class Solution:
    def sortArray(self, nums):
        width=1;n=len(nums);temp=[0]*n
        while width<n:
            for start in range(0,n,2*width):
                mid=min(start+width,n);end=min(start+2*width,n);a,b=start,mid
                for i in range(start,end):
                    if a<mid and (b==end or nums[a]<=nums[b]):temp[i]=nums[a];a+=1
                    else:temp[i]=nums[b];b+=1
            nums,temp=temp,nums;width*=2
        return nums
