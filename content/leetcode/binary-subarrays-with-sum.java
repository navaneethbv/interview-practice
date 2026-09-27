class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0, 1);
        int prefixSum = 0;
        int total = 0;
        for (int value : nums) {
            prefixSum += value;
            total += prefixCounts.getOrDefault(prefixSum - goal, 0);
            prefixCounts.put(prefixSum, prefixCounts.getOrDefault(prefixSum, 0) + 1);
        }
        return total;
    }
}
