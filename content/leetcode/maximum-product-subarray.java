class Solution {
    public int maxProduct(int[] nums) {
        int low = nums[0];
        int high = nums[0];
        int best = nums[0];
        for (int index = 1; index < nums.length; index++) {
            int value = nums[index];
            int extendLow = value * low;
            int extendHigh = value * high;
            low = Math.min(value, Math.min(extendLow, extendHigh));
            high = Math.max(value, Math.max(extendLow, extendHigh));
            best = Math.max(best, high);
        }
        return best;
    }
}
