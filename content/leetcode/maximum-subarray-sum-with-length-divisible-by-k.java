class Solution {
    public long maxSubarraySum(int[] nums, int k) {
        long[] minimumPrefix = new long[k];
        Arrays.fill(minimumPrefix, Long.MAX_VALUE);
        minimumPrefix[0] = 0;
        long prefix = 0;
        long best = Long.MIN_VALUE;
        for (int index = 0; index < nums.length; index++) {
            prefix += nums[index];
            int remainder = (index + 1) % k;
            if (minimumPrefix[remainder] != Long.MAX_VALUE) {
                best = Math.max(best, prefix - minimumPrefix[remainder]);
            }
            minimumPrefix[remainder] = Math.min(minimumPrefix[remainder], prefix);
        }
        return best;
    }
}
