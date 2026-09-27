class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] ways = new int[target + 1];
        ways[0] = 1;
        for (int total = 1; total <= target; total++) {
            long count = 0;
            for (int value : nums) {
                if (value <= total) {
                    count += ways[total - value];
                }
            }
            // An oversized intermediate count cannot contribute to a valid bounded answer.
            ways[total] = (int) Math.min(Integer.MAX_VALUE, count);
        }
        return ways[target];
    }
}
