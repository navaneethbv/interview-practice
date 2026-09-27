class Solution {
    public int maxSumDivThree(int[] nums) {
        int[] best = {0, Integer.MIN_VALUE, Integer.MIN_VALUE};
        for (int value : nums) {
            int[] next = best.clone();
            for (int remainder = 0; remainder < 3; remainder++) {
                if (best[remainder] == Integer.MIN_VALUE) {
                    continue;
                }
                int newRemainder = (remainder + value) % 3;
                next[newRemainder] = Math.max(next[newRemainder], best[remainder] + value);
            }
            best = next;
        }
        return best[0];
    }
}
