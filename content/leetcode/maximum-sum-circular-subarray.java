class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int currentMax = nums[0];
        int bestMax = nums[0];
        int currentMin = nums[0];
        int bestMin = nums[0];
        int total = nums[0];
        for (int index = 1; index < nums.length; index++) {
            int value = nums[index];
            currentMax = Math.max(value, currentMax + value);
            bestMax = Math.max(bestMax, currentMax);
            currentMin = Math.min(value, currentMin + value);
            bestMin = Math.min(bestMin, currentMin);
            total += value;
        }
        if (bestMax < 0) {
            return bestMax;
        }
        return Math.max(bestMax, total - bestMin);
    }
}
