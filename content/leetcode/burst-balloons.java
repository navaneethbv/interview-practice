class Solution {
    public int maxCoins(int[] nums) {
        int[] values = new int[nums.length + 2];
        values[0] = 1;
        values[values.length - 1] = 1;
        System.arraycopy(nums, 0, values, 1, nums.length);

        int[][] best = new int[values.length][values.length];
        for (int gap = 2; gap < values.length; gap++) {
            for (int left = 0; left + gap < values.length; left++) {
                int right = left + gap;
                for (int lastBurst = left + 1; lastBurst < right; lastBurst++) {
                    int coins = best[left][lastBurst]
                            + best[lastBurst][right]
                            + values[left] * values[lastBurst] * values[right];
                    best[left][right] = Math.max(best[left][right], coins);
                }
            }
        }
        return best[0][values.length - 1];
    }
}
