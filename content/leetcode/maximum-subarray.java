class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0];
        int current = nums[0];
        for (int index = 1; index < nums.length; index++) {
            int value = nums[index];
            current = Math.max(value, current + value);
            best = Math.max(best, current);
        }
        return best;
    }
}
