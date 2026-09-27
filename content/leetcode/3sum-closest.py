class Solution:
    def threeSumClosest(self, nums, target):
        nums.sort()
        best = sum(nums[:3])
        for i in range(len(nums)-2):
            l,r = i+1,len(nums)-1
            while l<r:
                total = nums[i]+nums[l]+nums[r]
                if abs(total-target)<abs(best-target):
                    best = total
                if total == target:
                    return total
                if total<target:
                    l+=1
                else:
                    r-=1
        return best
