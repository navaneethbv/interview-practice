class Solution {
    public long subArrayRanges(int[] nums) {
        long result = 0;
        for (int i = 0; i < nums.length; i++) {
            int low = nums[i], high = nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                low = Math.min(low, nums[j]); high = Math.max(high, nums[j]);
                result += (long) high - low;
            }
        }
        return result;
    }
}
