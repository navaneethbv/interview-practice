class Solution {
    public int minCost(int n, int[] cuts) {
        Arrays.sort(cuts);
        int size = cuts.length + 2;
        int[] positions = new int[size];
        System.arraycopy(cuts, 0, positions, 1, cuts.length);
        positions[size - 1] = n;
        int[][] dp = new int[size][size];
        for (int gap = 2; gap < size; gap++) {
            for (int left = 0; left + gap < size; left++) {
                int right = left + gap;
                dp[left][right] = Integer.MAX_VALUE;
                for (int middle = left + 1; middle < right; middle++) {
                    int cost = positions[right] - positions[left]
                            + dp[left][middle] + dp[middle][right];
                    dp[left][right] = Math.min(dp[left][right], cost);
                }
            }
        }
        return dp[0][size - 1];
    }
}
