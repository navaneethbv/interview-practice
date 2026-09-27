class Solution {
    public int minSwaps(int[] nums, int[] forbidden) {
        int length = nums.length;
        Map<Integer, Integer> combinedCounts = new HashMap<>();
        Map<Integer, Integer> conflicts = new HashMap<>();
        int conflictCount = 0;
        int largestConflictGroup = 0;
        for (int index = 0; index < length; index++) {
            combinedCounts.merge(nums[index], 1, Integer::sum);
            combinedCounts.merge(forbidden[index], 1, Integer::sum);
            if (nums[index] == forbidden[index]) {
                conflictCount++;
                int groupSize = conflicts.merge(nums[index], 1, Integer::sum);
                largestConflictGroup = Math.max(largestConflictGroup, groupSize);
            }
        }
        for (int count : combinedCounts.values()) {
            if (count > length) {
                return -1;
            }
        }
        return Math.max((conflictCount + 1) / 2, largestConflictGroup);
    }
}
