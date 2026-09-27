class Solution {
    public int longestNiceSubarray(int[] nums) {
        int mask = 0;
        int left = 0;
        int best = 0;
        for (int right = 0; right < nums.length; right++) {
            while ((mask & nums[right]) != 0) {
                mask ^= nums[left];
                left++;
            }
            mask |= nums[right];
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
