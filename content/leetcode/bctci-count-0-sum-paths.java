class Solution {
    private static final int MOD = 1_000_000_007;

    public int countZeroPaths(int[][] grid) {
        int cols = grid[0].length;
        long[] previous = new long[cols];
        for (int r = 0; r < grid.length; r++) {
            long[] current = new long[cols];
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    continue;
                }
                if (r == 0 && c == 0) {
                    current[c] = 1;
                    continue;
                }
                long ways = (c > 0 ? current[c - 1] : 0) + (r > 0 ? previous[c] : 0) + (r > 0 && c > 0 ? previous[c - 1] : 0);
                current[c] = ways % MOD;
            }
            previous = current;
        }
        return (int) previous[cols - 1];
    }
}
