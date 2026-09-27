class Solution:
    def canPartitionKSubsets(self, nums, k):
        total=sum(nums)
        if total%k: return False
        target=total//k; nums.sort(reverse=True)
        if nums[0]>target: return False
        buckets=[0]*k
        def place(i):
            if i==len(nums): return True
            seen=set()
            for bucket in range(k):
                if buckets[bucket] in seen or buckets[bucket]+nums[i]>target: continue
                seen.add(buckets[bucket]); buckets[bucket]+=nums[i]
                if place(i+1): return True
                buckets[bucket]-=nums[i]
                if buckets[bucket]==0: break
            return False
        return place(0)
