class Solution {
    public int minSteps(int n) {
        int[] steps = new int[n + 1];
        for (int value = 2; value <= n; value++) {
            int best = steps[value - 1];
            if (value % 2 == 0) {
                best = Math.min(best, steps[value / 2]);
            }
            if (value % 3 == 0) {
                best = Math.min(best, steps[value / 3]);
            }
            steps[value] = best + 1;
        }
        return steps[n];
    }
}
