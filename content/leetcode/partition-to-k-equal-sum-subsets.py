class Solution:
    def canPartitionKSubsets(self, nums, k):
        total = sum(nums)
        if total % k:
            return False
        target = total // k
        nums.sort(reverse=True)
        if nums[0] > target:
            return False
        return self._place(nums, [0] * k, target, 0)

    def _place(self, nums, buckets, target, index):
        """Place nums[index:] into buckets, skipping equal bucket states."""
        if index == len(nums):
            return True
        seen_sums = set()
        for bucket in range(len(buckets)):
            current_sum = buckets[bucket]
            if current_sum in seen_sums or current_sum + nums[index] > target:
                continue
            seen_sums.add(current_sum)
            buckets[bucket] += nums[index]
            if self._place(nums, buckets, target, index + 1):
                return True
            buckets[bucket] -= nums[index]
            if buckets[bucket] == 0:
                break
        return False
