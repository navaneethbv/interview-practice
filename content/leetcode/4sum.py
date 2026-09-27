class Solution:
    def fourSum(self, nums, target):
        nums.sort(); result = []
        for a in range(len(nums)-3):
            if a and nums[a] == nums[a-1]: continue
            for b in range(a+1,len(nums)-2):
                if b == a+1 or nums[b] != nums[b-1]:
                    self._collect_pairs(nums, a, b, target, result)
        return result

    def _collect_pairs(self, nums, a, b, target, result):
        l,r = b+1,len(nums)-1
        while l<r:
            total = nums[a]+nums[b]+nums[l]+nums[r]
            if total<target: l+=1
            elif total>target: r-=1
            else:
                result.append([nums[a],nums[b],nums[l],nums[r]]); l+=1; r-=1
                while l<r and nums[l]==nums[l-1]: l+=1
                while l<r and nums[r]==nums[r+1]: r-=1
