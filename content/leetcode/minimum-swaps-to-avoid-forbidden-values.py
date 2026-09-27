class Solution:
    def minSwaps(self, nums, forbidden):
        from collections import Counter
        length = len(nums)
        combined_counts = Counter(nums) + Counter(forbidden)
        if max(combined_counts.values()) > length:
            return -1
        conflicts = Counter(
            value for value, blocked in zip(nums, forbidden) if value == blocked
        )
        conflict_count = sum(conflicts.values())
        largest_conflict_group = max(conflicts.values(), default=0)
        return max((conflict_count + 1) // 2, largest_conflict_group)
