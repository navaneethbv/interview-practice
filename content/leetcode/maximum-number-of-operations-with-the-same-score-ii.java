class Solution {
    public int maxOperations(int[] nums) {
        int firstScore = nums[0] + nums[1];
        int lastScore = nums[nums.length - 2] + nums[nums.length - 1];
        int outerScore = nums[0] + nums[nums.length - 1];
        int best = bestForScore(nums, firstScore);
        best = Math.max(best, bestForScore(nums, lastScore));
        return Math.max(best, bestForScore(nums, outerScore));
    }

    private int bestForScore(int[] nums, int score) {
        int[][] memo = new int[nums.length][nums.length];
        for (int length = 2; length <= nums.length; length++) {
            for (int left = 0; left + length <= nums.length; left++) {
                int right = left + length - 1;
                int best = 0;
                if (nums[left] + nums[left + 1] == score) {
                    best = Math.max(best, 1 + stored(memo, left + 2, right));
                }
                if (nums[right - 1] + nums[right] == score) {
                    best = Math.max(best, 1 + stored(memo, left, right - 2));
                }
                if (nums[left] + nums[right] == score) {
                    best = Math.max(best, 1 + stored(memo, left + 1, right - 1));
                }
                memo[left][right] = best;
            }
        }
        return memo[0][nums.length - 1];
    }

    private int stored(int[][] table, int left, int right) {
        if (left > right) {
            return 0;
        }
        return table[left][right];
    }
}
