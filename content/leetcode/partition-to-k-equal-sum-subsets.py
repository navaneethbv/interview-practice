class Solution:
    def canPartitionKSubsets(self, nums, k):
        total=sum(nums)
        if total%k: return False
        target=total//k; nums.sort(reverse=True)
        if nums[0]>target: return False
        return self._place(nums,[0]*k,target,0)

    def _place(self, nums, buckets, target, i):
        """Backtracks nums[i:] into buckets, skipping buckets with an already-tried sum."""
        if i==len(nums): return True
        seen=set()
        for bucket in range(len(buckets)):
            if buckets[bucket] in seen or buckets[bucket]+nums[i]>target: continue
            seen.add(buckets[bucket]); buckets[bucket]+=nums[i]
            if self._place(nums,buckets,target,i+1): return True
            buckets[bucket]-=nums[i]
            if buckets[bucket]==0: break
        return False
